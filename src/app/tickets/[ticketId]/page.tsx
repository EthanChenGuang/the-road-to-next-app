import Link from 'next/link';

import initialTickets from '@/data';
import { paths } from '@/paths';

type TicketPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

const TicketPage = async ({ params }: TicketPageProps) => {
  const { ticketId } = await params;

  const ticket = initialTickets.find(
    (ticket) => ticket.id === parseInt(ticketId)
  );

  return (
    <div>
      <Link href={paths.tickets} className="text-blue-500">
        Go to tickets
      </Link>
      <h1 className="text-2xl font-bold">TicketPage {ticket?.title}</h1>
      <p>{ticket?.content}</p>
      <p>{ticket?.status}</p>
    </div>
  );
};

export default TicketPage;
