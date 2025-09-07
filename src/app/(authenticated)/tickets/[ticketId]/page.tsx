import { notFound } from 'next/navigation';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { Separator } from '@/components/ui/separator';
import { TicketItem } from '@/features/ticket/components/ticket-item';
import { getTicket } from '@/features/ticket/queries/get-ticket';
import { paths } from '@/paths';

type TicketPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

const TicketPage = async ({ params }: TicketPageProps) => {
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);

  if (!ticket) {
    notFound();
  }

  const breadcrumbs = [
    { title: 'Home', href: paths.home },
    { title: 'Tickets', href: paths.tickets },
    { title: ticket.title },
  ];

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Separator />
      <div className="flex flex-col items-center animate-fade-in-from-top gap-8">
        <TicketItem ticket={ticket} isDetail={true} />
      </div>
    </div>
  );
};

export default TicketPage;
