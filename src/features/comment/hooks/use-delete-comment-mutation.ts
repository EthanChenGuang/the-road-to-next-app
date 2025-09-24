'use client';

import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteComment } from '../actions/delete-comment';
import { CommentWithMetadata } from '../types';

type CommentPage = {
  list: CommentWithMetadata[];
  metadata: {
    hasNextPage: boolean;
    cursor: string | undefined;
  };
};

export const useDeleteCommentMutation = (ticketId: string) => {
  const queryClient = useQueryClient();
  const queryKey = ['comments', ticketId];

  return useMutation({
    mutationFn: async (commentId: string) => {
      const result = await deleteComment({ commentId });
      if (result.status === 'ERROR') {
        throw new Error(result.message);
      }
      return commentId;
    },
    onMutate: async (commentId: string) => {
      // Cancel outgoing re-fetches
      await queryClient.cancelQueries({ queryKey });

      // Snapshot previous value
      const previousComments = queryClient.getQueryData(queryKey);

      // Optimistically remove comment
      queryClient.setQueryData(queryKey, (old: InfiniteData<CommentPage> | undefined) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            list: page.list.filter((comment: CommentWithMetadata) => comment.id !== commentId),
          })),
        };
      });

      return { previousComments };
    },
    onError: (_err, _commentId, context) => {
      // Rollback on error
      if (context?.previousComments) {
        queryClient.setQueryData(queryKey, context.previousComments);
      }
      // Note: Toast is handled by delete button component
    },
    onSuccess: () => {
      // Note: Toast is handled by delete button component
    },
  });
};