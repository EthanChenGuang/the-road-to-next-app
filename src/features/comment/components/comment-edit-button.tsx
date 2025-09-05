import { LucidePencil } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { paths } from '@/paths';

type CommentEditButtonProps = {
  commentId: string;
  ticketId: string;
};

const CommentEditButton = ({ commentId, ticketId }: CommentEditButtonProps) => {
  return (
    <Button variant="outline" size="icon">
      <Link prefetch href={paths.editComment(ticketId, commentId)}>
        <LucidePencil className="w-4 h-4" />
      </Link>
    </Button>
  );
};

export { CommentEditButton };
