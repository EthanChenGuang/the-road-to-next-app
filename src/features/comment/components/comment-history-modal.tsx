'use client';

import { useEffect, useState, useTransition } from 'react';
import { toast } from 'sonner';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import {
  CommentHistoryEntry,
  getCommentHistoryAction,
} from '../actions/get-comment-history';
import { revertComment } from '../actions/revert-comment';
import { CommentHistory } from './comment-history';

type CommentHistoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  commentId: string;
  ticketId: string;
  currentContent: string;
};

const CommentHistoryModal = ({
  isOpen,
  onClose,
  commentId,
  ticketId,
  currentContent,
}: CommentHistoryModalProps) => {
  const [history, setHistory] = useState<CommentHistoryEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (isOpen && commentId) {
      setLoading(true);
      getCommentHistoryAction(commentId)
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

  const handleRevert = (version: number) => {
    startTransition(async () => {
      try {
        const result = await revertComment(commentId, ticketId, version);

        if (result.status === 'SUCCESS') {
          toast.success(result.message || `Reverted to version ${version}`);
          onClose();
          // Refresh the page to show the reverted comment
          window.location.reload();
        } else {
          toast.error(result.message || 'Failed to revert comment');
        }
      } catch (error) {
        console.error('Failed to revert comment:', error);
        toast.error('Failed to revert comment');
      }
    });
  };

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
              currentContent={currentContent}
              history={history}
              onRevert={handleRevert}
            />
          )}
        </div>

        {isPending && (
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-[60]">
            <div className="bg-background p-4 rounded-lg shadow-lg">
              <div className="text-sm">Reverting comment...</div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export { CommentHistoryModal };
