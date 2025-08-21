import Placeholder from '@/components/placeholder';
import { SearchInput } from '@/components/search-input';

import { getTickets } from '../queries/get-tickets';
import { SearchParams } from '../search-params';
import TicketItem from './ticket-item';

type TicketListProps = {
  userId?: string | null;
  searchParams: SearchParams;
};

export const TicketList = async ({ userId, searchParams }: TicketListProps) => {
  const resolvedSearchParams = await searchParams;
  const tickets = await getTickets(userId, resolvedSearchParams);

  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top">
      <div className="w-full max-w-[420px]">
        <SearchInput placeholder="Search tickets ..." />
      </div>

      {tickets.length > 0 ? (
        tickets.map((ticket) => (
          <TicketItem key={ticket.id} ticket={ticket} isDetail={false} />
        ))
      ) : (
        <Placeholder label="No tickets found" />
      )}
    </div>
  );
};
