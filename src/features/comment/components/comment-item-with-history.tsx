'use client';

import { useState } from 'react';

import { CommentWithMetadata } from '../types';
import { CommentHistoryDialog } from './comment-history-dialog';
import { CommentItem } from './comment-item';

type CommentItemWithHistoryProps = {
  comment: CommentWithMetadata;
  ticketId: string;
  buttons?: React.ReactNode[];
};

const CommentItemWithHistory = ({
  comment,
  ticketId,
  buttons,
}: CommentItemWithHistoryProps) => {
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);

  const handleViewHistory = () => {
    setIsHistoryDialogOpen(true);
  };

  return (
    <>
      <CommentItem
        comment={comment}
        buttons={buttons}
        onViewHistory={comment.isEdited ? handleViewHistory : undefined}
      />

      {comment.isEdited && (
        <CommentHistoryDialog
          isOpen={isHistoryDialogOpen}
          onClose={() => setIsHistoryDialogOpen(false)}
          commentId={comment.id}
          ticketId={ticketId}
          currentContent={comment.content}
        />
      )}
    </>
  );
};

export { CommentItemWithHistory };
