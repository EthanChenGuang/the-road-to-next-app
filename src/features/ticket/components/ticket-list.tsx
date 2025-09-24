import { NuqsAdapter } from 'nuqs/adapters/next/app';

import Placeholder from '@/components/placeholder';

import { getTickets } from '../queries/get-tickets';
import { ParsedSearchParams } from '../search-params';
import { TicketItem } from './ticket-item';
import { TicketPagination } from './ticket-pagination';
import { TicketSearchInput } from './ticket-search-input';
import { TicketSortSelect } from './ticket-sort-select';

type TicketListProps = {
  userId?: string | null;
  searchParams: ParsedSearchParams;
};

export const TicketList = async ({ userId, searchParams }: TicketListProps) => {
  // const resolvedSearchParams = await searchParams;
  const { list: tickets, metadata: ticketMetadata } = await getTickets(
    searchParams,
    userId
  );

  return (
    <NuqsAdapter>
      <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top">
        <div className="w-full max-w-[420px] flex gap-x-2">
          <TicketSearchInput placeholder="Search tickets ..." />
          <TicketSortSelect
            options={[
              {
                sortKey: 'createdAt',
                sortValue: 'desc',
                label: 'Newest',
              },
              {
                sortKey: 'createdAt',
                sortValue: 'asc',
                label: 'Oldest',
              },
              {
                sortKey: 'bounty',
                sortValue: 'desc',
                label: 'Bounty',
              },
            ]}
          />
        </div>

        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <TicketItem
              key={ticket.id}
              ticket={ticket}
              isDetail={false}
              paginatedComments={{ list: [], metadata: { hasNextPage: false, cursor: undefined } }}
            />
          ))
        ) : (
          <Placeholder label="No tickets found" />
        )}

        <div className="w-full max-w-[420px]">
          <TicketPagination paginatedTicketMetadata={ticketMetadata} />
        </div>
      </div>
    </NuqsAdapter>
  );
};
