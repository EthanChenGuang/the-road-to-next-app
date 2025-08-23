import { NuqsAdapter } from 'nuqs/adapters/next/app';

import Placeholder from '@/components/placeholder';
import { SearchInput } from '@/components/search-input';
import { SortSelect } from '@/components/sort-select';

import { getTickets } from '../queries/get-tickets';
import { ParsedSearchParams } from '../search-params';
import TicketItem from './ticket-item';

type TicketListProps = {
  userId?: string | null;
  searchParams: ParsedSearchParams;
};

export const TicketList = async ({ userId, searchParams }: TicketListProps) => {
  // const resolvedSearchParams = await searchParams;
  const tickets = await getTickets(searchParams, userId);

  return (
    <NuqsAdapter>
      <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top">
        <div className="w-full max-w-[420px] flex gap-x-2">
          <SearchInput placeholder="Search tickets ..." />
          <SortSelect
            // options={[
            //   { label: 'Newest', value: 'newest' },
            //   { label: 'Bounty', value: 'bounty' },
            // ]}
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
            <TicketItem key={ticket.id} ticket={ticket} isDetail={false} />
          ))
        ) : (
          <Placeholder label="No tickets found" />
        )}
      </div>
    </NuqsAdapter>
  );
};
