import { LucideArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Button } from '@/components/ui/button';
import TicketItem from '@/features/ticket/components/ticket-item';
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

  return (
    <>
      <div className="flex flex-col items-center animate-fade-in-from-top gap-8">
        <TicketItem ticket={ticket} isDetail={true} />
        <Button variant="outline" asChild>
          <Link href={paths.tickets} className="flex items-center gap-2">
            <LucideArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </Button>
      </div>
    </>
  );
};

export default TicketPage;
