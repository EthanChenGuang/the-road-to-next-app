'use client';

import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createComment } from '../actions/create-comment';
import { CommentWithMetadata } from '../types';

type CommentPage = {
  list: CommentWithMetadata[];
  metadata: {
    hasNextPage: boolean;
    cursor: string | undefined;
  };
};

export const useCreateCommentMutation = (ticketId: string) => {
  const queryClient = useQueryClient();
  const queryKey = ['comments', ticketId];

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const result = await createComment(
        { ticketId },
        { status: 'SUCCESS', message: '', fieldErrors: {}, payload: undefined, timestamp: Date.now() },
        formData
      );

      if (result.status === 'ERROR') {
        throw new Error(result.message);
      }

      return result.data as CommentWithMetadata;
    },
    onMutate: async (formData: FormData) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey });

      // Snapshot previous value
      const previousComments = queryClient.getQueryData(queryKey);

      // Optimistically update cache with new comment
      const content = formData.get('content') as string;
      const optimisticComment: CommentWithMetadata = {
        id: `temp-${Date.now()}`, // Temporary ID
        content,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 'temp-user',
        ticketId,
        isOwner: true,
        isEdited: false,
        editCount: 0,
        lastEditAt: null,
        user: { username: 'You' },
      };

      queryClient.setQueryData(queryKey, (old: InfiniteData<CommentPage> | undefined) => {
        if (!old) return old;
        const newPages = [...old.pages];
        if (newPages[0]) {
          newPages[0] = {
            ...newPages[0],
            list: [optimisticComment, ...newPages[0].list],
          };
        }
        return {
          ...old,
          pages: newPages,
        };
      });

      return { previousComments, optimisticComment };
    },
    onError: (err, formData, context) => {
      // Rollback on error
      if (context?.previousComments) {
        queryClient.setQueryData(queryKey, context.previousComments);
      }
      toast.error('Failed to create comment');
    },
    onSuccess: (data, _formData, context) => {
      // Replace optimistic update with real data
      queryClient.setQueryData(queryKey, (old: InfiniteData<CommentPage> | undefined) => {
        if (!old) return old;
        const newPages = [...old.pages];
        if (newPages[0] && context?.optimisticComment) {
          newPages[0] = {
            ...newPages[0],
            list: newPages[0].list.map((comment: CommentWithMetadata) =>
              comment.id === context.optimisticComment.id ? data : comment
            ),
          };
        }
        return {
          ...old,
          pages: newPages,
        };
      });
      toast.success('Comment created.');
    },
  });
};
