'use server';

import {
  ActionState,
  fromErrorToActionState,
} from '@/components/form/utils/to-action-state';
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';

import { getCommentHistory } from '../queries/get-comment-history';

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

    const history = await getCommentHistory(commentId);

    return {
      status: 'SUCCESS' as const,
      message: 'Comment history retrieved',
      data: history,
      fieldErrors: {},
      timestamp: Date.now(),
    };
  } catch (error) {
    return fromErrorToActionState(error);
  }
};

export { getCommentHistoryAction };
