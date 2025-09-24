'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import { useCreateCommentMutation } from '../hooks/use-create-comment-mutation';
import { CommentWithMetadata } from '../types';

type CommentCreateFormProps = {
  ticketId: string;
  onCreateComment?: (comment: CommentWithMetadata) => void;
};

const CommentCreateForm = ({
  ticketId,
  onCreateComment,
}: CommentCreateFormProps) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const mutation = useCreateCommentMutation(ticketId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      setError('Please enter a comment');
      return;
    }

    if (content.length > 1024) {
      setError('Comment must be less than 1024 characters');
      return;
    }

    setError('');

    try {
      const formData = new FormData();
      formData.append('content', content);

      const newComment = await mutation.mutateAsync(formData);
      onCreateComment?.(newComment);
      setContent('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create comment');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add a comment"
        disabled={mutation.isPending}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      <Button
        type="submit"
        disabled={mutation.isPending || !content.trim()}
      >
        {mutation.isPending ? 'Creating...' : 'Comment'}
      </Button>
    </form>
  );
};

export { CommentCreateForm };
