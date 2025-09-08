import { prisma } from '@/lib/prisma';

export const getCommentHistory = async (commentId: string) => {
  const history = await prisma.commentHistory.findMany({
    where: { commentId },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          email: true,
        },
      },
    },
    orderBy: { version: 'desc' },
  });
  
  return history;
};

export const getCommentWithHistory = async (commentId: string) => {
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          email: true,
        },
      },
      history: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
              email: true,
            },
          },
        },
        orderBy: { version: 'desc' },
      },
    },
  });
  
  return comment;
};