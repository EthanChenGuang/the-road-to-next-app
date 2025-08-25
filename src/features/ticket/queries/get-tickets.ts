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
): Promise<{
  list: (Ticket & { user: { username: string } })[];
  metadata: {
    total: number;
    hasNextPage: boolean;
  };
}> => {
  const where = {
    userId: userId ?? undefined,
    title: {
      contains: searchParams.search,
      mode: 'insensitive' as const,
    },
  };

  const skip = searchParams.page * searchParams.size;
  const take = searchParams.size;

  const [tickets, total] = await prisma.$transaction([
    prisma.ticket.findMany({
      where,
      skip,
      take,
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
    }),
    prisma.ticket.count({
      where,
    }),
  ]);

  // const tickets = await prisma.ticket.findMany({
  //   where,
  //   skip,
  //   take,
  //   orderBy: {
  //     [searchParams.sortKey]: searchParams.sortValue,
  //   },
  //   include: {
  //     user: {
  //       select: {
  //         username: true,
  //       },
  //     },
  //   },
  // });

  // const total = await prisma.ticket.count({
  //   where,
  // });

  return {
    list: tickets,
    metadata: {
      total,
      hasNextPage: skip + take < total,
    },
  };
};
