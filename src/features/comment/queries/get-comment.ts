import { prisma } from '@/lib/prisma';

export const getComment = async (commentId: string) => {
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
  });
  return comment;
};
