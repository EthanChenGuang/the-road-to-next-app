'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import {
  CommentHistoryEntry,
  getCommentHistory,
} from '../actions/get-comment-history';
import { CommentHistory } from './comment-history';

type CommentHistoryDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  commentId: string;
  ticketId: string;
  currentContent: string;
};

const CommentHistoryDialog = ({
  isOpen,
  onClose,
  commentId,
  ticketId,
  currentContent,
}: CommentHistoryDialogProps) => {
  const [history, setHistory] = useState<CommentHistoryEntry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && commentId) {
      setLoading(true);
      getCommentHistory(commentId)
        .then((result) => {
          if (result.status === 'SUCCESS' && result.data) {
            setHistory(result.data);
          } else {
            toast.error(result.message || 'Failed to load comment history');
          }
        })
        .catch((error) => {
          console.error('Failed to fetch comment history:', error);
          toast.error('Failed to load comment history');
        })
        .finally(() => setLoading(false));
    }
  }, [isOpen, commentId]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Comment Edit History</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <div className="text-muted-foreground">Loading history...</div>
            </div>
          ) : (
            <CommentHistory
              commentId={commentId}
              ticketId={ticketId}
              currentContent={currentContent}
              history={history}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { CommentHistoryDialog };
