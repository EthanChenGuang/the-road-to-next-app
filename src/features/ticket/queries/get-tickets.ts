// import initialTickets from '@/data';

// import { Ticket } from '../types';

// export const getTickets = async (): Promise<Ticket[]> => {
//   await new Promise((resolve) => setTimeout(resolve, 2000));
//   // throw new Error('Failed to fetch tickets');

//   return new Promise((resolve) => {
//     resolve(initialTickets);
//   });
// };

import { prisma } from '@/lib/prisma';

// export const getTickets = async (userId?: string | null): Promise<Ticket[]> => {
export const getTickets = async (userId?: string | null) => {
  const tickets = await prisma.ticket.findMany({
    where: {
      userId: userId ?? undefined,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
  return tickets;
};
