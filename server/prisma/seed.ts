import prisma from './client.js';
import bcrypt from 'bcryptjs';

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data (optional - be careful in production!)
  console.log('🧹 Cleaning existing data...');
  await prisma.reply.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.group.deleteMany();
  await prisma.user.deleteMany();

  // 1. Create Users
  console.log('👤 Creating users...');
  const hashedPassword = await bcrypt.hash('password123', 12);

  const user1 = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      password: hashedPassword,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: hashedPassword,
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: 'Bob Johnson',
      email: 'bob@example.com',
      password: hashedPassword,
      googleId: 'google_123456789',
    },
  });

  console.log(`✅ Created ${3} users`);

  // 2. Demo circle (all seed users are members)
  console.log('👥 Creating demo circle...');
  const demoGroup = await prisma.group.create({
    data: {
      name: 'Demo Circle',
      ownerId: user1.id,
      inviteToken: 'seed-demo-invite-token',
      memberIds: [user1.id, user2.id, user3.id],
    },
  });

  // 3. Create Posts
  console.log('📝 Creating posts...');
  const post1 = await prisma.post.create({
    data: {
      title: 'Beautiful Sunset at the Beach',
      message: 'Just watched an amazing sunset today! The colors were absolutely breathtaking. Nature never fails to amaze me.',
      name: user1.name,
      creator: user1.id,
      tags: ['sunset', 'beach', 'nature', 'photography'],
      selectedFile: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      likes: [user2.id, user3.id],
      groupId: demoGroup.id,
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: 'My First Coding Project',
      message: 'Finally finished my first full-stack application! Learned so much about React, Node.js, and databases. The journey has been incredible!',
      name: user2.name,
      creator: user2.id,
      tags: ['coding', 'programming', 'webdev', 'react'],
      selectedFile: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800',
      likes: [user1.id],
      groupId: demoGroup.id,
    },
  });

  const post3 = await prisma.post.create({
    data: {
      title: 'Delicious Homemade Pizza',
      message: 'Made pizza from scratch today! The dough was perfect and the toppings were fresh. Cooking is such a therapeutic activity.',
      name: user3.name,
      creator: user3.id,
      tags: ['food', 'cooking', 'pizza', 'recipe'],
      selectedFile: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800',
      likes: [user1.id, user2.id],
      groupId: demoGroup.id,
    },
  });

  await prisma.post.create({
    data: {
      title: 'Mountain Hiking Adventure',
      message: 'Conquered the mountain today! The view from the top was worth every step. Already planning the next adventure.',
      name: user1.name,
      creator: user1.id,
      tags: ['hiking', 'adventure', 'mountains', 'outdoors'],
      selectedFile: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      likes: [],
      groupId: demoGroup.id,
    },
  });

  console.log(`✅ Created ${4} posts in circle "${demoGroup.name}"`);

  // 4. Create Comments
  console.log('💬 Creating comments...');
  const comment1 = await prisma.comment.create({
    data: {
      text: 'Wow, that sunset looks incredible! Where was this taken?',
      authorId: user2.id,
      authorName: user2.name,
      postId: post1.id,
    },
  });

  await prisma.comment.create({
    data: {
      text: 'Congratulations on your first project! That\'s a huge milestone! 🎉',
      authorId: user1.id,
      authorName: user1.name,
      postId: post2.id,
    },
  });

  await prisma.comment.create({
    data: {
      text: 'That pizza looks amazing! Can you share the recipe?',
      authorId: user1.id,
      authorName: user1.name,
      postId: post3.id,
    },
  });

  const comment4 = await prisma.comment.create({
    data: {
      text: 'Great job on the coding project! What technologies did you use?',
      authorId: user3.id,
      authorName: user3.name,
      postId: post2.id,
    },
  });

  console.log(`✅ Created ${4} comments`);

  // 5. Create Replies
  console.log('↩️ Creating replies...');
  await prisma.reply.create({
    data: {
      text: 'Thanks! It was taken at Malibu Beach. You should definitely visit!',
      authorId: user1.id,
      authorName: user1.name,
      commentId: comment1.id,
    },
  });

  await prisma.reply.create({
    data: {
      text: 'Thank you so much! I used React, Node.js, Express, and PostgreSQL.',
      authorId: user2.id,
      authorName: user2.name,
      commentId: comment4.id,
    },
  });

  console.log(`✅ Created ${2} replies`);

  console.log('\n🎉 Seed completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`   - Users: ${3}`);
  console.log(`   - Circles: ${1}`);
  console.log(`   - Posts: ${4}`);
  console.log(`   - Comments: ${4}`);
  console.log(`   - Replies: ${2}`);
  console.log('\n🔑 Test Credentials:');
  console.log('   Email: john@example.com | Password: password123');
  console.log('   Email: jane@example.com | Password: password123');
  console.log('   Email: bob@example.com | Password: password123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
