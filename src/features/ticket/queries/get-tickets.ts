// import initialTickets from '@/data';

// import { Ticket } from '../types';

// export const getTickets = async (): Promise<Ticket[]> => {
//   await new Promise((resolve) => setTimeout(resolve, 2000));
//   // throw new Error('Failed to fetch tickets');

//   return new Promise((resolve) => {
//     resolve(initialTickets);
//   });
// };

import { Ticket } from '@prisma/client';

import { prisma } from '@/lib/prisma';

export const getTickets = async (): Promise<Ticket[]> => {
  const tickets = await prisma.ticket.findMany({
    orderBy: {
      updatedAt: 'desc',
    },
  });
  return tickets;
};
