import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import Heading from '@/components/heading';
import Placeholder from '@/components/placeholder';
import { Spinner } from '@/components/spinner';
import { TicketList } from '@/features/ticket/components/ticket-list';

//export const dynamic = 'force-dynamic';  // for dynamic data
//export const revalidate = 10; // time based cache for static data (10 seconds)

const TicketsPage = () => {
  return (
    <div className="flex flex-col gap-y-16">
      <Heading title="Tickets" description="All your tickets at one place" />

      <ErrorBoundary fallback={<Placeholder label="Failed to load tickets" />}>
        <Suspense fallback={<Spinner />}>
          <TicketList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default TicketsPage;
