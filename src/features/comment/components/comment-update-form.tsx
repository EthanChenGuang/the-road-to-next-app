'use client';

import { Comment } from '@prisma/client';
import { useActionState } from 'react';

import { Form } from '@/components/form/form';
import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import { updateComment } from '../actions/update-comment';

type CommentUpdateFormProps = {
  comment: Comment;
};

const CommentUpdateForm = ({ comment }: CommentUpdateFormProps) => {
  const [actionState, formAction] = useActionState(
    updateComment.bind(null, comment.id, comment.ticketId),
    EMPTY_ACTION_STATE
  );

  return (
    <Form action={formAction} actionState={actionState}>
      <input type="hidden" name="commentId" defaultValue={comment.id} />
      <Textarea name="content" defaultValue={comment.content} />
      <Button type="submit">Update</Button>
    </Form>
  );
};

export { CommentUpdateForm };
