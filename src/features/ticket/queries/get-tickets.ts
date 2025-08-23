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

import { ParsedSearchParams } from '../search-params';

export const getTickets = async (
  searchParams: ParsedSearchParams,
  userId?: string | null
): Promise<(Ticket & { user: { username: string } })[]> => {
  const tickets = await prisma.ticket.findMany({
    where: {
      userId: userId ?? undefined,
      title: {
        contains: searchParams.search,
        mode: 'insensitive',
      },
    },
    orderBy: {
      [searchParams.sortKey]: searchParams.sortValue,
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
