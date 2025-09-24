'use server';

import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';

import { getCommentHistory as getCommentHistoryQuery } from '../queries/get-comment-history';

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

const getCommentHistory = async (
  commentId: string
): Promise<ActionState & { data?: CommentHistoryEntry[] | undefined }> => {
  try {
    await getAuthOrRedirect();

    const history = await getCommentHistoryQuery(commentId);

    return toActionState('SUCCESS', 'Comment history retrieved', undefined, history);
  } catch (error) {
    return fromErrorToActionState(error);
  }
};

export { getCommentHistory };
