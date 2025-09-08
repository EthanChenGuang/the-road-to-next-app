'use client';

import { useState } from 'react';

import { CommentWithMetadata } from '../types';
import { CommentHistoryModal } from './comment-history-modal';
import { CommentItem } from './comment-item';

type CommentItemWithHistoryProps = {
  comment: CommentWithMetadata;
  ticketId: string;
  buttons?: React.ReactNode[];
};

const CommentItemWithHistory = ({ 
  comment, 
  ticketId, 
  buttons 
}: CommentItemWithHistoryProps) => {
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  const handleViewHistory = () => {
    setIsHistoryModalOpen(true);
  };

  return (
    <>
      <CommentItem
        comment={comment}
        buttons={buttons}
        onViewHistory={comment.isEdited ? handleViewHistory : undefined}
      />
      
      {comment.isEdited && (
        <CommentHistoryModal
          isOpen={isHistoryModalOpen}
          onClose={() => setIsHistoryModalOpen(false)}
          commentId={comment.id}
          ticketId={ticketId}
          currentContent={comment.content}
        />
      )}
    </>
  );
};

export { CommentItemWithHistory };