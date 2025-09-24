import { format } from 'date-fns';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { CommentWithMetadata } from '@/features/comment/types';

type CommentItemProps = {
  comment: CommentWithMetadata;
  buttons?: React.ReactNode[];
  onViewHistory?: () => void;
};

const CommentItem = ({ comment, buttons, onViewHistory }: CommentItemProps) => {
  const displayDate =
    comment.isEdited && comment.lastEditAt
      ? comment.lastEditAt
      : comment.createdAt;

  const dateLabel =
    comment.isEdited && comment.lastEditAt ? 'Last edited' : 'Created';

  return (
    <div className="flex gap-x-2">
      <Card className="p-4 flex-1 flex flex-col gap-y-5">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-x-2">
            <p className="text-sm text-muted-foreground">
              {comment.user?.username ?? 'Deleted User'}
            </p>
            {comment.isEdited && (
              <Badge
                variant="outline"
                className="text-xs cursor-pointer hover:bg-muted"
                onClick={onViewHistory}
              >
                Edited
              </Badge>
            )}
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">
              {dateLabel}: {format(displayDate, 'yyyy-MM-dd HH:mm')}
            </p>
            {comment.isEdited && comment.lastEditAt && (
              <p className="text-xs text-muted-foreground">
                {/* Originally: {comment.createdAt.toLocaleString()} */}
                Originally: {format(comment.createdAt, 'yyyy-MM-dd HH:mm')}
              </p>
            )}
          </div>
        </div>
        <p className="whitespace-pre-line">{comment.content}</p>
      </Card>

      {buttons && <div className="flex flex-col gap-y-1">{buttons}</div>}
    </div>
  );
};

export { CommentItem };
