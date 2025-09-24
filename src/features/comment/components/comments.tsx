'use client';

import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { CardCompact } from '@/components/card-compact';
import { PaginatedData } from '@/types/pagination';

import { useDeleteCommentMutation } from '../hooks/use-delete-comment-mutation';
import { getComments } from '../queries/get-comments';
import { CommentWithMetadata } from '../types';
import { CommentCreateForm } from './comment-create-form';
import { CommentDeleteButton } from './comment-delete-button';
import { CommentEditButton } from './comment-edit-button';
import { CommentItemWithHistory } from './comment-item-with-history';

type CommentPage = {
  list: CommentWithMetadata[];
  metadata: {
    hasNextPage: boolean;
    cursor: string | undefined;
  };
};

type CommentsProps = {
  ticketId: string;
  paginatedComments: PaginatedData<CommentWithMetadata>;
};

const Comments = ({ ticketId, paginatedComments }: CommentsProps) => {
  const queryKey = ['comments', ticketId];
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<CommentPage, Error, InfiniteData<CommentPage>, readonly unknown[], string | undefined>({
      queryKey,
      queryFn: ({ pageParam }) =>
        getComments(ticketId, pageParam as string | undefined),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage: CommentPage) =>
        lastPage.metadata.hasNextPage ? lastPage.metadata.cursor : undefined,
      initialData: {
        pages: [
          {
            metadata: {
              hasNextPage: paginatedComments.metadata.hasNextPage,
              cursor: paginatedComments.metadata.cursor,
            },
            list: paginatedComments.list,
          },
        ],
        pageParams: [undefined],
      },
    });

  const comments = data?.pages.flatMap((page) => page.list) ?? [];

  const deleteCommentMutation = useDeleteCommentMutation(ticketId);

  const handleDeleteComment = async (commentId: string) => {
    await deleteCommentMutation.mutateAsync(commentId);
  };

  const handleCreateComment = async () => {
    // The mutation hook handles the optimistic update
  };

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

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

      <div ref={ref}>
        {!hasNextPage && (
          <p className="text-xs text-muted-foreground text-right">
            No more comments
          </p>
        )}
      </div>
    </div>
  );
};

export { Comments };
