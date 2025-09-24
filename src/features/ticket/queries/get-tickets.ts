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

import { getAuth } from '@/features/auth/queries/get-auth';
import { isOwner } from '@/features/auth/utils/is-owner';
import { prisma } from '@/lib/prisma';

import { ParsedSearchParams } from '../search-params';

export const getTickets = async (
  searchParams: ParsedSearchParams,
  userId?: string | null
): Promise<{
  list: (Ticket & { user: { username: string }; isOwner: boolean })[];
  metadata: {
    total: number;
    hasNextPage: boolean;
  };
}> => {
  const { user } = await getAuth();

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
    list: tickets.map((ticket) => ({
      ...ticket,
      isOwner: isOwner(user, ticket),
    })),
    metadata: {
      total,
      hasNextPage: skip + take < total,
    },
  };
};
