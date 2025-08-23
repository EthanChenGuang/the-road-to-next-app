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

  await prisma.ticket.createMany({
    data: tickets,
  });

  const endTime = performance.now();
  console.log(`Seeding database completed in ${endTime - startTime}ms`);
};

seed();
