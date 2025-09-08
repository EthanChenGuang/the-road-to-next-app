'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { setCookieByKey } from '@/actions/cookies';
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import { getAuth } from '@/features/auth/queries/get-auth';
import { prisma } from '@/lib/prisma';
import { paths } from '@/paths';

const updateComment = async (
  commentId: string,
  ticketId: string,
  _actionState: ActionState,
  formData: FormData
) => {
  if (!commentId) {
    return toActionState('ERROR', 'Comment ID is required');
  }

  const content = formData.get('content') as string;
  
  if (!content || content.trim() === '') {
    return toActionState('ERROR', 'Comment content is required');
  }

  try {
    // Get the current user
    const auth = await getAuth();
    const currentUserId = auth.user?.id;

    // Get the current comment to save its content to history
    const currentComment = await prisma.comment.findUnique({
      where: { id: commentId },
      include: {
        history: {
          select: { version: true },
          orderBy: { version: 'desc' },
          take: 1,
        },
      },
    });

    if (!currentComment) {
      return toActionState('ERROR', 'Comment not found');
    }

    // Don't update if content is the same
    if (currentComment.content === content.trim()) {
      revalidatePath(paths.ticket(ticketId));
      await setCookieByKey('toast', 'No changes made to comment');
      redirect(paths.ticket(ticketId));
    }

    // Calculate next version number
    const nextVersion = (currentComment.history[0]?.version || 0) + 1;

    // Save current comment to history and update comment in a transaction
    await prisma.$transaction(async (tx) => {
      // Save current comment content to history
      await tx.commentHistory.create({
        data: {
          commentId: commentId,
          content: currentComment.content,
          version: nextVersion,
          editedBy: currentUserId,
          changeType: 'UPDATE',
        },
      });

      // Update the comment with new content and history tracking
      await tx.comment.update({
        where: { id: commentId },
        data: {
          content: content.trim(),
          isEdited: true,
          editCount: currentComment.editCount + 1,
          lastEditAt: new Date(),
        },
      });
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(paths.ticket(ticketId));
  
  await setCookieByKey('toast', 'Comment updated');
  redirect(paths.ticket(ticketId));
};

export { updateComment };
