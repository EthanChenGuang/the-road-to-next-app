'use client';

import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';

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
      // Here you would call your delete comment server action
      // For now, we'll simulate the deletion
      return commentId;
    },
    onMutate: async (commentId: string) => {
      // Cancel outgoing refetches
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
    onError: (err, commentId, context) => {
      // Rollback on error
      if (context?.previousComments) {
        queryClient.setQueryData(queryKey, context.previousComments);
      }
      // Note: Toast is handled by useConfirmDialog, not here
    },
    onSuccess: () => {
      // Note: Toast is handled by useConfirmDialog, not here
    },
  });
};