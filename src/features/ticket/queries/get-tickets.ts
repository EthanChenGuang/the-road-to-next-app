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

// import { SearchParams } from '../search-params';

// export const getTickets = async (userId?: string | null): Promise<Ticket[]> => {
export const getTickets = async (
  userId?: string | null,
  searchParams?: { search?: string }
) => {
  const tickets = await prisma.ticket.findMany({
    where: {
      userId: userId ?? undefined,
      title: {
        contains: searchParams?.search ?? '',
        mode: 'insensitive',
      },
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
