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
import { Select } from 'react-day-picker';

import { prisma } from '@/lib/prisma';

export const getTickets = async (): Promise<Ticket[]> => {
  const tickets = await prisma.ticket.findMany({
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
