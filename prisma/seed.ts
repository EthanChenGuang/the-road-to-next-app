import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const tickets = [
  {
    title: 'Ticket 1',
    content: 'This is the first ticket from the database',
    status: 'DONE' as const,
    deadline: '2024-12-31',
    bounty: 50000,
  },
  {
    title: 'Ticket 2',
    content: 'This is the second ticket from the database',
    status: 'OPEN' as const,
    deadline: '2024-12-15',
    bounty: 25000,
  },
  {
    title: 'Ticket 3',
    content: 'This is the third ticket from the database',
    status: 'IN_PROGRESS' as const,
    deadline: '2024-11-30',
    bounty: 75000,
  },
];

const seed = async () => {
  const startTime = performance.now();
  console.log('Seeding tickets started ...');
  // for (const ticket of tickets) {
  //     await prisma.ticket.create({
  //         data: ticket,
  //     });
  // }

  // const promises = tickets.map(async (ticket) => {
  //     await prisma.ticket.create({
  //         data: ticket,
  //     });
  // });
  // await Promise.all(promises);
  await prisma.ticket.deleteMany();

  await prisma.ticket.createMany({
    data: tickets,
  });

  const endTime = performance.now();
  console.log(`Seeding tickets completed in ${endTime - startTime}ms`);
};

seed();
