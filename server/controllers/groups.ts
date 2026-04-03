import { Response } from 'express';
import { randomBytes } from 'crypto';
import prisma from '../prisma/client.js';
import { AuthRequest } from '../middleware/auth.js';

function makeInviteToken(): string {
  return randomBytes(24).toString('base64url');
}

export const createGroup = async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.userId) {
    res.status(401).json({ message: 'Unauthenticated' });
    return;
  }

  const name = typeof req.body?.name === 'string' ? req.body.name.trim() : '';
  if (!name) {
    res.status(400).json({ message: 'Group name is required' });
    return;
  }

  try {
    const group = await prisma.group.create({
      data: {
        name,
        ownerId: req.userId,
        inviteToken: makeInviteToken(),
        memberIds: [req.userId],
      },
    });

    res.status(201).json({
      _id: group.id,
      name: group.name,
      ownerId: group.ownerId,
      inviteToken: group.inviteToken,
      memberIds: group.memberIds,
      createdAt: group.createdAt,
    });
  } catch (e: unknown) {
    const err = e as Error;
    res.status(409).json({ message: err.message });
  }
};

export const listMyGroups = async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.userId) {
    res.status(401).json({ message: 'Unauthenticated' });
    return;
  }

  try {
    const groups = await prisma.group.findMany({
      where: { memberIds: { has: req.userId } },
      orderBy: { updatedAt: 'desc' },
    });

    res.json({
      data: groups.map((g) => ({
        _id: g.id,
        name: g.name,
        ownerId: g.ownerId,
        inviteToken: g.inviteToken,
        memberIds: g.memberIds,
        createdAt: g.createdAt,
      })),
    });
  } catch (e: unknown) {
    const err = e as Error;
    res.status(500).json({ message: err.message });
  }
};

export const getGroup = async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.userId) {
    res.status(401).json({ message: 'Unauthenticated' });
    return;
  }

  const { id } = req.params;
  try {
    const group = await prisma.group.findUnique({ where: { id } });
    if (!group) {
      res.status(404).json({ message: 'Circle not found' });
      return;
    }
    if (!group.memberIds.includes(req.userId)) {
      res.status(403).json({ message: 'Not a member of this circle' });
      return;
    }

    const users = await prisma.user.findMany({
      where: { id: { in: group.memberIds } },
      select: { id: true, name: true },
    });
    const byId = new Map(users.map((u) => [u.id, u]));
    const members = group.memberIds
      .map((userId) => {
        const u = byId.get(userId);
        if (!u) return null;
        return {
          id: u.id,
          name: u.name,
          role: userId === group.ownerId ? ('Owner' as const) : ('Member' as const),
        };
      })
      .filter((m): m is NonNullable<typeof m> => m !== null);

    res.json({
      _id: group.id,
      name: group.name,
      ownerId: group.ownerId,
      inviteToken: group.inviteToken,
      memberIds: group.memberIds,
      members,
      createdAt: group.createdAt,
    });
  } catch (e: unknown) {
    const err = e as Error;
    res.status(500).json({ message: err.message });
  }
};

export const joinGroup = async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.userId) {
    res.status(401).json({ message: 'Unauthenticated' });
    return;
  }

  const token = typeof req.body?.inviteToken === 'string' ? req.body.inviteToken.trim() : '';
  if (!token) {
    res.status(400).json({ message: 'inviteToken is required' });
    return;
  }

  try {
    const group = await prisma.group.findUnique({ where: { inviteToken: token } });
    if (!group) {
      res.status(404).json({ message: 'Invalid invite link' });
      return;
    }
    if (group.memberIds.includes(req.userId)) {
      res.json({
        _id: group.id,
        name: group.name,
        ownerId: group.ownerId,
        inviteToken: group.inviteToken,
        memberIds: group.memberIds,
        createdAt: group.createdAt,
      });
      return;
    }

    const updated = await prisma.group.update({
      where: { id: group.id },
      data: { memberIds: { push: req.userId } },
    });

    res.json({
      _id: updated.id,
      name: updated.name,
      ownerId: updated.ownerId,
      inviteToken: updated.inviteToken,
      memberIds: updated.memberIds,
      createdAt: updated.createdAt,
    });
  } catch (e: unknown) {
    const err = e as Error;
    res.status(409).json({ message: err.message });
  }
};
