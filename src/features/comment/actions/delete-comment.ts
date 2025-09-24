'use server';

import {
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';
import { isOwner } from '@/features/auth/utils/is-owner';
import { prisma } from '@/lib/prisma';

const deleteComment = async ({ commentId }: { commentId: string }) => {
  const { user } = await getAuthOrRedirect();

  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
  });

  if (!comment || !isOwner(user, comment)) {
    return toActionState('ERROR', 'Not authorized');
  }

  try {
    await prisma.comment.delete({
      where: { id: commentId },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  return toActionState('SUCCESS', 'Comment deleted');
};

export { deleteComment };
