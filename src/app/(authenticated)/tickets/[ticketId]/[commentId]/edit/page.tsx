import { Separator } from '@radix-ui/react-dropdown-menu';
import { notFound } from 'next/navigation';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { CardCompact } from '@/components/card-compact';
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';
import { isOwner } from '@/features/auth/utils/is-owner';
import { CommentUpdateForm } from '@/features/comment/components/comment-update-form';
import { getComment } from '@/features/comment/queries/get-comment';
import { getTicket } from '@/features/ticket/queries/get-ticket';
import { paths } from '@/paths';

type CommentEditPageParams = {
  params: Promise<{
    ticketId: string;
    commentId: string;
  }>;
};

const CommentEditPage = async ({ params }: CommentEditPageParams) => {
  const { user } = await getAuthOrRedirect();
  const { commentId, ticketId } = await params;
  const comment = await getComment(commentId);
  const ticket = await getTicket(ticketId);

  const isCommentFound = !!comment;
  const isTicketFound = !!ticket;
  const isCommentOwner = isOwner(user, comment) && isCommentFound;

  if (!isCommentOwner || !isCommentFound || !isTicketFound) {
    notFound();
  }

  const breadcrumbs = [
    { title: 'Home', href: paths.home },
    { title: 'Tickets', href: paths.tickets },
    { title: ticket.title, href: paths.ticket(ticketId) },
    { title: 'Edit Comment' },
  ];
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Separator />
      <div className="flex-1 flex flex-col items-center animate-fade-in-from-top">
        <CardCompact
          title="Edit Comment"
          description="Edit an existing comment"
          content={<CommentUpdateForm comment={comment} />}
          className="w-full max-w-[420px] self-center"
          classNameTitle="text-2xl font-semibold tracking-tight"
        />
      </div>
    </div>
  );
};

export default CommentEditPage;
