import { notFound } from 'next/navigation';

import { CardCompact } from '@/components/card-compact';
import { TicketUpsertForm } from '@/features/ticket/components/ticket-upsert-form';
import { getTicket } from '@/features/ticket/queries/get-ticket';

type TicketEditPageParams = {
  params: Promise<{
    ticketId: string;
  }>;
};

const TicketEditPage = async ({ params }: TicketEditPageParams) => {
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);

  if (!ticket) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col items-center animate-fade-in-from-top">
      <CardCompact
        title="Edit Ticket"
        description="Edit an existing ticket"
        content={<TicketUpsertForm ticket={ticket} />}
        className="w-full max-w-[420px] self-center"
        classNameTitle="text-2xl font-semibold tracking-tight"
      />
    </div>
  );
};

export default TicketEditPage;
