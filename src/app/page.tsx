import Link from 'next/link';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import Heading from '@/components/heading';
import Placeholder from '@/components/placeholder';
import { Spinner } from '@/components/spinner';
import { TicketList } from '@/features/ticket/components/ticket-list';
// import { getBaseUrl } from '@/utils/url';

const HomePage = () => {
  //   const baseUrl = getBaseUrl();
  //   console.log(baseUrl);

  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="All Tickets"
        description="Tickets by everyone at one place"
      />
      <ErrorBoundary fallback={<Placeholder label="Failed to load tickets" />}>
        <Suspense fallback={<Spinner />}>
          <TicketList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default HomePage;
