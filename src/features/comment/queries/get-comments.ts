'use server';

import { getAuth } from '@/features/auth/queries/get-auth';
import { isOwner } from '@/features/auth/utils/is-owner';
import { prisma } from '@/lib/prisma';

export const getComments = async (ticketId: string, cursor?: string) => {
  const { user } = await getAuth();

  const take = 2;
  const where = cursor
    ? {
        ticketId,
        createdAt: { lt: new Date(cursor) },
      }
    : {
        ticketId,
      };

  // console.log('getComments called with cursor:', cursor);
  // console.log('Query where:', JSON.stringify(where, null, 2));

  let comments = await prisma.comment.findMany({
    where,
    take: take + 1,
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
    orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
  });

  console.log('Found comments:', comments.length);

  const hasNextPage = comments.length > take;
  const lastComment = hasNextPage ? comments[take - 1] : comments.at(-1);
  const nextCursor = lastComment
    ? lastComment.createdAt.toISOString()
    : undefined;
  comments = hasNextPage ? comments.slice(0, -1) : comments;

  // console.log('hasNextPage:', hasNextPage);
  // console.log('nextCursor:', nextCursor);
  // console.log('Returning comments count:', comments.length);

  return {
    list: comments.map((comment) => ({
      ...comment,
      isOwner: isOwner(user, comment),
    })),
    metadata: {
      hasNextPage,
      cursor: nextCursor,
    },
  };
};
