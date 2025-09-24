'use client';

import { useState } from 'react';

import { CardCompact } from '@/components/card-compact';
import { Button } from '@/components/ui/button';
import { PaginatedData } from '@/types/pagination';

import { getComments } from '../queries/get-comments';
import { CommentWithMetadata } from '../types';
import { CommentCreateForm } from './comment-create-form';
import { CommentDeleteButton } from './comment-delete-button';
import { CommentEditButton } from './comment-edit-button';
import { CommentItemWithHistory } from './comment-item-with-history';

type CommentsProps = {
  ticketId: string;
  paginatedComments: PaginatedData<CommentWithMetadata>;
};

const Comments = ({ ticketId, paginatedComments }: CommentsProps) => {
  const [comments, setComments] = useState(paginatedComments.list);
  const [metadata, setMetadata] = useState(paginatedComments.metadata);

  const handleMore = async () => {
    console.log('Current cursor:', metadata.cursor);
    console.log('Current hasNextPage:', metadata.hasNextPage);

    const morePaginatedComments = await getComments(ticketId, metadata.cursor);
    const moreComments = morePaginatedComments.list;

    console.log('Fetched comments:', moreComments.length);
    console.log('New metadata:', morePaginatedComments.metadata);

    // Filter out any duplicates to prevent React key errors
    const existingIds = new Set(comments.map((c) => c.id));
    const uniqueMoreComments = moreComments.filter(
      (c) => !existingIds.has(c.id)
    );

    console.log('Unique new comments:', uniqueMoreComments.length);

    setComments([...comments, ...uniqueMoreComments]);
    setMetadata(morePaginatedComments.metadata);
  };

  const handleDeleteComment = async (commentId: string) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId)
    );
  };

  const handleCreateComment = async (comment: CommentWithMetadata) => {
    setComments((prevComments) => {
      // Prevent duplicates
      if (prevComments.some((c) => c.id === comment.id)) {
        return prevComments;
      }
      return [comment, ...prevComments];
    });
  };

  return (
    <div className="flex flex-col gap-y-4">
      <CardCompact
        title="Create Comment"
        description="A new comment will be created"
        content={
          <CommentCreateForm
            ticketId={ticketId}
            onCreateComment={handleCreateComment}
          />
        }
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
              ...(comment.isOwner
                ? [
                    <CommentDeleteButton
                      key="0"
                      commentId={comment.id}
                      onDeleteComment={handleDeleteComment}
                    />,
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

      <div className="flex flex-col justify-center ml-8">
        {metadata.hasNextPage && (
          <Button variant="ghost" onClick={handleMore}>
            More
          </Button>
        )}
      </div>
    </div>
  );
};

export { Comments };
