import { hash } from '@node-rs/argon2';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const users = [
  {
    username: 'admin',
    email: 'quanter.chen@gmail.com',
    passwordHash:
      '$2a$10$K7L/P5GIGOOduqNOHSeR8.QJEFJJfJ7/Q7Dq6H8H8H8H8H8H8H8H8',
  },
  {
    username: 'guang',
    email: 'chen.guang.regis@gmail.com',
    passwordHash:
      '$2a$10$K7L/P5GIGOOduqNOHSeR8.QJEFJJfJ7/Q7Dq6H8H8H8H8H8H8H8H8',
  },
  {
    username: 'ethan',
    email: 'quanter_chen@hotmail.com',
    passwordHash:
      '$2a$10$K7L/P5GIGOOduqNOHSeR8.QJEFJJfJ7/Q7Dq6H8H8H8H8H8H8H8H8',
  },
];

const seed = async () => {
  const startTime = performance.now();
  console.log('Seeding database started ...');

  // Clean up existing data
  await prisma.comment.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  console.log('Creating users...');
  const passwordHash = await hash('password');

  const dbUsers = await prisma.user.createManyAndReturn({
    data: users.map((user) => ({ ...user, passwordHash })),
  });

  // Create tickets with different timestamps
  console.log('Creating tickets...');
  const baseTime = new Date('2024-01-01T10:00:00.000Z');
  
  const tickets = [
    {
      title: 'Ticket 1',
      content: 'The first ticket from the database',
      status: 'DONE' as const,
      deadline: '2024-12-31',
      bounty: 50000,
      userId: dbUsers[0].id,
      createdAt: new Date(baseTime.getTime() + 2 * 24 * 60 * 60 * 1000), // Newest (created last)
    },
    {
      title: 'Ticket 2',
      content: 'The second ticket from the database',
      status: 'OPEN' as const,
      deadline: '2024-12-15',
      bounty: 25000,
      userId: dbUsers[1].id,
      createdAt: new Date(baseTime.getTime() + 24 * 60 * 60 * 1000), // Middle
    },
    {
      title: 'Ticket 3',
      content: 'The third ticket from the database',
      status: 'IN_PROGRESS' as const,
      deadline: '2024-11-30',
      bounty: 75000,
      userId: dbUsers[2].id,
      createdAt: new Date(baseTime.getTime()), // Oldest (created first)
    },
  ];

  const dbTickets = await prisma.ticket.createManyAndReturn({
    data: tickets,
  });

  // Create comments with different timestamps
  console.log('Creating comments...');
  const comments = [
    // Comments for Ticket 1 (DONE) - showing progression
    {
      content: "I'll take a look at this ticket and provide an update soon.",
      ticketId: dbTickets[0].id,
      userId: dbUsers[1].id, // guang
      createdAt: new Date(baseTime.getTime() + 2 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000), // 2 hours after ticket creation
    },
    {
      content: "Started working on this. Should have initial results by tomorrow.",
      ticketId: dbTickets[0].id,
      userId: dbUsers[1].id, // guang
      createdAt: new Date(baseTime.getTime() + 2 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000), // 6 hours after ticket creation
    },
    {
      content: "Great progress! Looking forward to the results.",
      ticketId: dbTickets[0].id,
      userId: dbUsers[0].id, // admin (ticket creator)
      createdAt: new Date(baseTime.getTime() + 2 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000), // 8 hours after ticket creation
    },
    {
      content: "Task completed successfully. All requirements have been met.",
      ticketId: dbTickets[0].id,
      userId: dbUsers[1].id, // guang
      createdAt: new Date(baseTime.getTime() + 3 * 24 * 60 * 60 * 1000), // Day after ticket creation
    },

    // Comments for Ticket 2 (OPEN) - initial discussions
    {
      content: "Could you provide more details about the specific requirements?",
      ticketId: dbTickets[1].id,
      userId: dbUsers[2].id, // ethan
      createdAt: new Date(baseTime.getTime() + 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000), // 3 hours after ticket creation
    },
    {
      content: "This looks interesting. What's the expected timeline?",
      ticketId: dbTickets[1].id,
      userId: null, // anonymous comment
      createdAt: new Date(baseTime.getTime() + 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000), // 5 hours after ticket creation
    },
    {
      content: "I have some experience with similar projects. Happy to collaborate if needed.",
      ticketId: dbTickets[1].id,
      userId: dbUsers[0].id, // admin
      createdAt: new Date(baseTime.getTime() + 24 * 60 * 60 * 1000 + 24 * 60 * 60 * 1000), // Day after ticket creation
    },

    // Comments for Ticket 3 (IN_PROGRESS) - active work updates
    {
      content: "Starting work on this ticket. Will provide regular updates.",
      ticketId: dbTickets[2].id,
      userId: dbUsers[2].id, // ethan (ticket creator)
      createdAt: new Date(baseTime.getTime() + 2 * 60 * 60 * 1000), // 2 hours after ticket creation
    },
    {
      content: "Made good progress on the initial setup. About 30% complete.",
      ticketId: dbTickets[2].id,
      userId: dbUsers[2].id, // ethan
      createdAt: new Date(baseTime.getTime() + 12 * 60 * 60 * 1000), // 12 hours after ticket creation
    },
    {
      content: "Looks promising! Let me know if you need any help with testing.",
      ticketId: dbTickets[2].id,
      userId: dbUsers[1].id, // guang
      createdAt: new Date(baseTime.getTime() + 16 * 60 * 60 * 1000), // 16 hours after ticket creation
    },
    {
      content: "Hit a small roadblock with the integration. Investigating solutions.",
      ticketId: dbTickets[2].id,
      userId: dbUsers[2].id, // ethan
      createdAt: new Date(baseTime.getTime() + 20 * 60 * 60 * 1000), // 20 hours after ticket creation
    },
    {
      content: "Have you considered using the new API endpoints? They might solve the integration issue.",
      ticketId: dbTickets[2].id,
      userId: null, // anonymous comment
      createdAt: new Date(baseTime.getTime() + 22 * 60 * 60 * 1000), // 22 hours after ticket creation
    },
  ];

  await prisma.comment.createMany({
    data: comments,
  });

  const endTime = performance.now();
  console.log(`Seeding database completed in ${endTime - startTime}ms`);
};

seed();
