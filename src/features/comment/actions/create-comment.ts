'use server';

import z from 'zod';

import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';
import { prisma } from '@/lib/prisma';

const createCommentSchema = z.object({
  content: z
    .string()
    .min(1, 'Please enter a comment')
    .max(1024, 'Comment must be less than 1024 characters'),
});

const createComment = async (
  { ticketId }: { ticketId: string },
  _actionState: ActionState,
  formData: FormData
) => {
  const { user } = await getAuthOrRedirect();

  if (!user) {
    return toActionState('ERROR', 'Unauthorized');
  }

  let comment;

  try {
    const formDataObject = Object.fromEntries(formData);
    const data = createCommentSchema.parse({
      content: formDataObject.content || '',
    });

    comment = await prisma.comment.create({
      data: {
        userId: user.id,
        ticketId,
        ...data,
      },
      include: {
        user: true,
      },
    });
  } catch (error) {
    // Handle database errors with user-friendly messages
    if (error instanceof Error) {
      if (
        error.message.includes('Invalid value provided') &&
        error.message.includes('userId')
      ) {
        return toActionState(
          'ERROR',
          'User authentication error. Please sign in again.'
        );
      }
      if (
        error.message.includes('Invalid value provided') &&
        error.message.includes('ticketId')
      ) {
        return toActionState(
          'ERROR',
          'This ticket id is no longer available. Please refresh the page.'
        );
      }
      if (
        error.message.includes('Invalid value provided') &&
        error.message.includes('content')
      ) {
        return toActionState(
          'ERROR',
          'Comment content is invalid. Please try again.'
        );
      }
      if (error.message.includes('Foreign key constraint')) {
        return toActionState(
          'ERROR',
          'This ticket is no longer available. Please refresh the page.'
        );
      }
    }
    return fromErrorToActionState(error);
  }

  return toActionState('SUCCESS', 'Comment created', undefined, {
    ...comment,
    isOwner: true,
  });
};

export { createComment };
