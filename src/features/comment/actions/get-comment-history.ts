'use server';

import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';
import { prisma } from '@/lib/prisma';

export type CommentHistoryEntry = {
  id: string;
  version: number;
  content: string;
  editedAt: Date;
  changeType: string;
  user: {
    id: string;
    username: string;
    email: string;
  } | null;
};

const getCommentHistoryAction = async (
  commentId: string
): Promise<ActionState & { data?: CommentHistoryEntry[] }> => {
  try {
    await getAuthOrRedirect();

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

    return {
      status: 'SUCCESS',
      message: 'Comment history retrieved',
      data: history,
    };
  } catch (error) {
    return fromErrorToActionState(error);
  }
};

export { getCommentHistoryAction };