import { notFound } from 'next/navigation';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { CardCompact } from '@/components/card-compact';
import { Separator } from '@/components/ui/separator';
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';
import { isOwner } from '@/features/auth/utils/is-owner';
import { TicketUpsertForm } from '@/features/ticket/components/ticket-upsert-form';
import { getTicket } from '@/features/ticket/queries/get-ticket';
import { paths } from '@/paths';

type TicketEditPageParams = {
  params: Promise<{
    ticketId: string;
  }>;
};

const TicketEditPage = async ({ params }: TicketEditPageParams) => {
  const { user } = await getAuthOrRedirect();
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);

  const isTicketFound = !!ticket;
  const isTicketOwner = isOwner(user, ticket);

  if (!isTicketFound || !isTicketOwner) {
    notFound();
  }

  const breadcrumbs = [
    { title: 'Home', href: paths.home },
    { title: 'Tickets', href: paths.tickets },
    { title: ticket.title, href: paths.ticket(ticketId) },
    { title: 'Edit' },
  ];

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Separator />
      <div className="flex-1 flex flex-col items-center animate-fade-in-from-top">
        <CardCompact
          title="Edit Ticket"
          description="Edit an existing ticket"
          content={<TicketUpsertForm ticket={ticket} />}
          className="w-full max-w-[420px] self-center"
          classNameTitle="text-2xl font-semibold tracking-tight"
        />
      </div>
    </div>
  );
};

export default TicketEditPage;
