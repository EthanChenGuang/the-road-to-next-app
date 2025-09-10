'use server';

import { revalidatePath } from 'next/cache';

import { setCookieByKey } from '@/actions/cookies';
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import { getAuth } from '@/features/auth/queries/get-auth';
import { prisma } from '@/lib/prisma';
import { paths } from '@/paths';

export const revertComment = async (
  formData: FormData
): Promise<ActionState> => {
  const commentId = formData.get('commentId') as string;
  const ticketId = formData.get('ticketId') as string;
  const historyVersion = parseInt(formData.get('version') as string);
  if (!commentId) {
    return toActionState('ERROR', 'Comment ID is required');
  }

  if (!historyVersion) {
    return toActionState('ERROR', 'History version is required');
  }

  try {
    // Get the current user
    const auth = await getAuth();
    const currentUserId = auth.user?.id;

    if (!currentUserId) {
      return toActionState('ERROR', 'Authentication required');
    }

    // Get the current comment and the history version to revert to
    const [currentComment, historyEntry] = await Promise.all([
      prisma.comment.findUnique({
        where: { id: commentId },
        include: {
          history: {
            select: { version: true },
            orderBy: { version: 'desc' },
            take: 1,
          },
        },
      }),
      prisma.commentHistory.findUnique({
        where: {
          commentId_version: {
            commentId,
            version: historyVersion,
          },
        },
      }),
    ]);

    if (!currentComment) {
      return toActionState('ERROR', 'Comment not found');
    }

    if (!historyEntry) {
      return toActionState('ERROR', 'History version not found');
    }

    // Don't revert if content is the same
    if (currentComment.content === historyEntry.content) {
      return toActionState('SUCCESS', 'Comment is already at this version');
    }

    // Calculate next version number for the revert history entry
    const nextVersion = (currentComment.history[0]?.version || 0) + 1;

    // Save current comment to history and revert to previous version in a transaction
    await prisma.$transaction(async (tx) => {
      // Save current comment content to history
      await tx.commentHistory.create({
        data: {
          commentId: commentId,
          content: currentComment.content,
          version: nextVersion,
          editedBy: currentUserId,
          changeType: 'REVERT',
        },
      });

      // Update the comment with the reverted content
      await tx.comment.update({
        where: { id: commentId },
        data: {
          content: historyEntry.content,
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
  await setCookieByKey('toast', `Comment reverted to version ${historyVersion}`);
  
  return toActionState('SUCCESS', 'Comment reverted successfully');
};

