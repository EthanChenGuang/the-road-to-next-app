import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const tickets = [
  {
    title: 'Ticket 1',
    content: 'This is the first ticket from the database',
    status: 'DONE' as const,
  },
  {
    title: 'Ticket 2',
    content: 'This is the second ticket from the database',
    status: 'OPEN' as const,
  },
  {
    title: 'Ticket 3',
    content: 'This is the third ticket from the database',
    status: 'IN_PROGRESS' as const,
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
