import { CardCompact } from '@/components/card-compact';
import { getAuth } from '@/features/auth/queries/get-auth';
import { isOwner } from '@/features/auth/utils/is-owner';
import { getComments } from '@/features/comment/queries/get-comments';

import { CommentCreateForm } from './comment-create-form';
import { CommentDeleteButton } from './comment-delete-button';
import { CommentEditButton } from './comment-edit-button';
import { CommentItemWithHistory } from './comment-item-with-history';

type CommentsProps = {
  ticketId: string;
};

const Comments = async ({ ticketId }: CommentsProps) => {
  const comments = await getComments(ticketId);
  const { user } = await getAuth();

  return (
    <div className="flex flex-col gap-y-4">
      <CardCompact
        title="Create Comment"
        description="A new comment will be created"
        content={<CommentCreateForm ticketId={ticketId} />}
        className="w-full max-w-[580px] self-center"
        classNameTitle="text-2xl font-semibold tracking-tight"
      />
      <div className="flex flex-col gap-y-4 ml-8">
        {comments.map((comment) => (
          <CommentItemWithHistory
            key={comment.id}
            comment={comment}
            ticketId={ticketId}
            buttons={[
              ...(isOwner(user, comment)
                ? [
                    <CommentDeleteButton key="0" commentId={comment.id} />,
                    <CommentEditButton
                      key="1"
                      commentId={comment.id}
                      ticketId={ticketId}
                    />,
                  ]
                : []),
            ]}
          />
        ))}
      </div>
    </div>
  );
};

export { Comments };
