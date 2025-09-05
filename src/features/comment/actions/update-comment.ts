'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { setCookieByKey } from '@/actions/cookies';
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
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

  try {
    await prisma.comment.update({
      where: { id: commentId },
      data: { content },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(paths.ticket(ticketId));
  
  await setCookieByKey('toast', 'Comment updated');
  redirect(paths.ticket(ticketId));
};

export { updateComment };
