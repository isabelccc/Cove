import { Request, Response } from 'express';
import Filter from 'bad-words';
import prisma from '../prisma/client.js';
import { AuthRequest } from '../middleware/auth.js';
import { groupIdsForUser, isGroupMember } from '../utils/groupAccess.js';

// Profanity filter initialization
const filter = new Filter();
filter.addWords('bad', 'some', 'hells');

interface PostBody {
  title: string;
  message: string;
  tags: string[];
  selectedFile: string;
  name?: string;
  groupId?: string;
}

interface CommentBody {
  text: string;
  authorName?: string;
}

// Helper function to transform Prisma Post to frontend format (with nested comments)
const transformPost = (post: any) => {
  return {
    _id: post.id,
    title: post.title,
    message: post.message,
    name: post.name,
    creator: post.creator,
    tags: post.tags,
    selectedFile: post.selectedFile,
    likes: post.likes,
    comments: post.comments?.map((comment: any) => ({
      _id: comment.id,
      text: comment.text,
      authorId: comment.authorId,
      authorName: comment.authorName,
      createdAt: comment.createdAt,
      replies: comment.replies?.map((reply: any) => ({
        _id: reply.id,
        text: reply.text,
        authorId: reply.authorId,
        authorName: reply.authorName,
        createdAt: reply.createdAt,
      })) || [],
    })) || [],
    groupId: post.groupId ?? null,
    createdAt: post.createdAt,
  };
};

async function assertCanReadPost(
  userId: string | undefined,
  post: { groupId: string | null; creator: string },
): Promise<boolean> {
  if (!userId) return false;
  if (post.groupId) return isGroupMember(userId, post.groupId);
  return post.creator === userId;
}

export const getPosts = async (req: AuthRequest, res: Response): Promise<void> => {
  const { page, groupId } = req.query;

  if (!req.userId) {
    res.status(401).json({ message: 'Unauthenticated' });
    return;
  }
  if (!groupId || typeof groupId !== 'string') {
    res.status(400).json({ message: 'groupId is required' });
    return;
  }
  if (!(await isGroupMember(req.userId, groupId))) {
    res.status(403).json({ message: 'Not a member of this circle' });
    return;
  }

  try {
    const LIMIT = 8;
    const pageNum = Number.isFinite(Number(page)) && Number(page) > 0 ? Number(page) : 1;
    const startIndex = (pageNum - 1) * LIMIT;

    const [total, posts] = await Promise.all([
      prisma.post.count({ where: { groupId } }),
      prisma.post.findMany({
        where: { groupId },
        take: LIMIT,
        skip: startIndex,
        orderBy: { createdAt: 'desc' },
        include: {
          comments: {
            include: {
              replies: true,
            },
            orderBy: { createdAt: 'asc' },
          },
        },
      }),
    ]);

    const transformedPosts = posts.map(transformPost);
    res.json({
      data: transformedPosts,
      currentPage: pageNum,
      numberOfPages: Math.max(1, Math.ceil(total / LIMIT)),
    });
  } catch (error: unknown) {
    const err = error as Error;
    res.status(404).json({ message: err.message });
  }
};

export const getPostsBySearch = async (req: AuthRequest, res: Response): Promise<void> => {
  const { searchQuery, tags, groupId } = req.query;

  if (!req.userId) {
    res.status(401).json({ message: 'Unauthenticated' });
    return;
  }
  if (!groupId || typeof groupId !== 'string') {
    res.status(400).json({ message: 'groupId is required for search' });
    return;
  }
  if (!(await isGroupMember(req.userId, groupId))) {
    res.status(403).json({ message: 'Not a member of this circle' });
    return;
  }

  try {
    const rawSearch = typeof searchQuery === 'string' ? searchQuery : '';
    const searchTerm = rawSearch && rawSearch !== 'none' ? rawSearch : '';
    const tagArray = tags ? (tags as string).split(',').filter(Boolean) : [];

    const orConditions: object[] = [];
    if (searchTerm) {
      orConditions.push({
        title: { contains: searchTerm, mode: 'insensitive' as const },
      });
      orConditions.push({
        message: { contains: searchTerm, mode: 'insensitive' as const },
      });
    }
    if (tagArray.length > 0) {
      orConditions.push({ tags: { hasSome: tagArray } });
    }

    const where: {
      groupId: string;
      OR?: object[];
    } = { groupId };

    if (orConditions.length > 0) {
      where.OR = orConditions;
    } else {
      res.json({ data: [] });
      return;
    }

    const posts = await prisma.post.findMany({
      where,
      include: {
        comments: {
          include: {
            replies: true,
          },
          orderBy: { createdAt: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const transformedPosts = posts.map(transformPost);
    res.json({ data: transformedPosts });
  } catch (error: unknown) {
    const err = error as Error;
    res.status(404).json({ message: err.message });
  }
};

export const getPostsByCreator = async (req: AuthRequest, res: Response): Promise<void> => {
  const creatorId = req.query.id as string;

  if (!req.userId) {
    res.status(401).json({ message: 'Unauthenticated' });
    return;
  }
  if (!creatorId) {
    res.status(400).json({ message: 'Creator id (query id) is required' });
    return;
  }

  try {
    const myGroupIds = await groupIdsForUser(req.userId);
    if (myGroupIds.length === 0) {
      res.json({ data: [] });
      return;
    }

    const posts = await prisma.post.findMany({
      where: {
        creator: creatorId,
        groupId: { in: myGroupIds },
      },
      include: {
        comments: {
          include: {
            replies: true,
          },
          orderBy: { createdAt: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const transformedPosts = posts.map(transformPost);
    res.json({ data: transformedPosts });
  } catch (error: unknown) {
    const err = error as Error;
    res.status(404).json({ message: err.message });
  }
};

export const getPost = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        comments: {
          include: {
            replies: {
              orderBy: { createdAt: 'asc' },
            },
          },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    if (!(await assertCanReadPost(req.userId, post))) {
      res.status(403).json({ message: 'Not allowed to view this post' });
      return;
    }

    const transformedPost = transformPost(post);
    res.status(200).json(transformedPost);
  } catch (error: unknown) {
    const err = error as Error;
    res.status(404).json({ message: err.message });
  }
};

export const createPost = async (req: AuthRequest, res: Response): Promise<void> => {
  const postData = (req as Request).body as PostBody;
  const { title, message, tags, selectedFile, name, groupId } = postData;

  if (!req.userId) {
    res.status(401).json({ message: 'Unauthenticated' });
    return;
  }
  if (!groupId) {
    res.status(400).json({ message: 'groupId is required' });
    return;
  }
  if (!(await isGroupMember(req.userId, groupId))) {
    res.status(403).json({ message: 'Not a member of this circle' });
    return;
  }

  try {
    // Bug: Missing validation - title and message could be undefined
    const cleanedTitle = filter.clean(title || '');
    const cleanedMessage = filter.clean(message || '');

    const newPost = await prisma.post.create({
      data: {
        title: cleanedTitle,
        message: cleanedMessage,
        tags: tags || [],
        selectedFile: selectedFile || null,
        name: name || 'Unknown',
        creator: req.userId,
        likes: [],
        groupId,
      },
      include: {
        comments: {
          include: {
            replies: true,
          },
        },
      },
    });

    const transformedPost = transformPost(newPost);
    res.status(201).json(transformedPost);
  } catch (error: unknown) {
    const err = error as Error;
    res.status(409).json({ message: err.message });
  }
};

export const updatePost = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = (req as Request<{ id: string }>).params;
  const postData = (req as Request).body as PostBody;
  const { title, message, selectedFile, tags } = postData;

  try {
    // Check if post exists
    const existingPost = await prisma.post.findUnique({
      where: { id },
    });

    if (!existingPost) {
      res.status(404).json({ message: `No post with id: ${id}` });
      return;
    }

    // Check if user is the creator
    if (existingPost.groupId && !(await isGroupMember(req.userId!, existingPost.groupId))) {
      res.status(403).json({ message: 'Not allowed to update this post' });
      return;
    }

    if (existingPost.creator !== req.userId) {
      res.status(403).json({ message: 'Not allowed to update this post' });
      return;
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        title: title ? filter.clean(title) : existingPost.title,
        message: message ? filter.clean(message) : existingPost.message,
        tags: tags || existingPost.tags,
        selectedFile: selectedFile || existingPost.selectedFile,
      },
      include: {
        comments: {
          include: {
            replies: true,
          },
        },
      },
    });

    const transformedPost = transformPost(updatedPost);
    res.json(transformedPost);
  } catch (error: unknown) {
    const err = error as Error;
    res.status(404).json({ message: err.message });
  }
};

export const deletePost = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = (req as Request<{ id: string }>).params;

  try {
    // Check if post exists and user is creator
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      res.status(404).json({ message: `No post with id: ${id}` });
      return;
    }

    if (post.groupId && !(await isGroupMember(req.userId!, post.groupId))) {
      res.status(403).json({ message: 'Not allowed to delete this post' });
      return;
    }

    if (post.creator !== req.userId) {
      res.status(403).json({ message: 'Not allowed to delete this post' });
      return;
    }

    // Delete post (comments and replies will be cascade deleted)
    await prisma.post.delete({
      where: { id },
    });

    res.json({ message: 'Post deleted successfully.' });
  } catch (error: unknown) {
    const err = error as Error;
    res.status(404).json({ message: err.message });
  }
};

export const likePost = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = (req as Request<{ id: string }>).params;

  if (!req.userId) {
    res.status(401).json({ message: 'Unauthenticated' });
    return;
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    if (post.groupId && !(await isGroupMember(req.userId, post.groupId))) {
      res.status(403).json({ message: 'Not allowed' });
      return;
    }

    const likes = post.likes || [];
    const index = likes.findIndex((likeId: string) => likeId === req.userId);

    let updatedLikes: string[];
    if (index === -1) {
      // Add like
      updatedLikes = [...likes, req.userId];
    } else {
      // Remove like
      updatedLikes = likes.filter((likeId: string) => likeId !== req.userId);
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: { likes: updatedLikes },
      include: {
        comments: {
          include: {
            replies: true,
          },
        },
      },
    });

    const transformedPost = transformPost(updatedPost);
    res.status(200).json(transformedPost);
  } catch (error: unknown) {
    const err = error as Error;
    res.status(404).json({ message: err.message });
  }
};

export const commentPost = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = (req as Request<{ id: string }>).params;
  const commentData = (req as Request).body as CommentBody;
  const { text } = commentData;

  if (!req.userId) {
    res.status(401).json({ message: 'Unauthenticated' });
    return;
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    if (post.groupId && !(await isGroupMember(req.userId, post.groupId))) {
      res.status(403).json({ message: 'Not allowed' });
      return;
    }

    const userName = req.userName || req.user?.name || commentData.authorName || 'Unknown';

    // Create comment (missing validation for empty text)
    await prisma.comment.create({
      data: {
        text: filter.clean(text || ''),
        authorId: req.userId!,
        authorName: userName,
        postId: id,
      },
    });

    // Fetch updated post with all comments
    const updatedPost = await prisma.post.findUnique({
      where: { id },
      include: {
        comments: {
          include: {
            replies: true,
          },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!updatedPost) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    const transformedPost = transformPost(updatedPost);
    res.json(transformedPost);
  } catch (error: unknown) {
    const err = error as Error;
    res.status(404).json({ message: err.message });
  }
};

export const editComment = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id, commentId } = (req as Request<{ id: string; commentId: string }>).params;
  const commentData = (req as Request).body as CommentBody;
  const { text } = commentData;

  if (!req.userId) {
    res.status(401).json({ message: 'Unauthenticated' });
    return;
  }

  try {
    // Check if post exists
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    if (post.groupId && !(await isGroupMember(req.userId, post.groupId))) {
      res.status(403).json({ message: 'Not allowed' });
      return;
    }

    // Check if comment exists and belongs to user
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      res.status(404).json({ message: 'Comment not found' });
      return;
    }

    if (comment.authorId !== req.userId) {
      res.status(403).json({ message: 'Not allowed' });
      return;
    }

    // Update comment
    await prisma.comment.update({
      where: { id: commentId },
      data: {
        text: filter.clean(text),
      },
    });

    // Fetch updated post
    const updatedPost = await prisma.post.findUnique({
      where: { id },
      include: {
        comments: {
          include: {
            replies: true,
          },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!updatedPost) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    const transformedPost = transformPost(updatedPost);
    res.json(transformedPost);
  } catch (error: unknown) {
    const err = error as Error;
    res.status(404).json({ message: err.message });
  }
};

export const deleteComment = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id, commentId } = (req as Request<{ id: string; commentId: string }>).params;

  if (!req.userId) {
    res.status(401).json({ message: 'Unauthenticated' });
    return;
  }

  try {
    // Check if post exists
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    if (post.groupId && !(await isGroupMember(req.userId, post.groupId))) {
      res.status(403).json({ message: 'Not allowed' });
      return;
    }

    // Check if comment exists and belongs to user
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      res.status(404).json({ message: 'Comment not found' });
      return;
    }

    if (comment.authorId !== req.userId) {
      res.status(403).json({ message: 'Not allowed' });
      return;
    }

    // Delete comment (replies will be cascade deleted)
    await prisma.comment.delete({
      where: { id: commentId },
    });

    // Fetch updated post
    const updatedPost = await prisma.post.findUnique({
      where: { id },
      include: {
        comments: {
          include: {
            replies: true,
          },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!updatedPost) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    const transformedPost = transformPost(updatedPost);
    res.json(transformedPost);
  } catch (error: unknown) {
    const err = error as Error;
    res.status(404).json({ message: err.message });
  }
};
