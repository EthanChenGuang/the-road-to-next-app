import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { CardCompact } from '@/components/card-compact';
import Heading from '@/components/heading';
import Placeholder from '@/components/placeholder';
// import { RedirectToast } from '@/components/redirect-toast';
import { Spinner } from '@/components/spinner';
import { TicketList } from '@/features/ticket/components/ticket-list';
import { TicketUpsertForm } from '@/features/ticket/components/ticket-upsert-form';

//export const dynamic = 'force-dynamic';  // for dynamic data
//export const revalidate = 10; // time based cache for static data (10 seconds)

const TicketsPage = () => {
  return (
    <>
      <div className="flex flex-col gap-y-16">
        <Heading title="Tickets" description="All your tickets at one place" />

        <CardCompact
          title="Create Ticket"
          description="A new ticket will be created"
          content={<TicketUpsertForm ticket={null} />}
          className="w-full max-w-[420px] self-center"
          classNameTitle="text-2xl font-semibold tracking-tight"
        />

        <ErrorBoundary
          fallback={<Placeholder label="Failed to load tickets" />}
        >
          <Suspense fallback={<Spinner />}>
            <TicketList />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* <RedirectToast /> */}
    </>
  );
};

export default TicketsPage;
