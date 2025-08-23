import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import Heading from '@/components/heading';
import Placeholder from '@/components/placeholder';
import { Spinner } from '@/components/spinner';
import { TicketList } from '@/features/ticket/components/ticket-list';
import { searchParamsCache } from '@/features/ticket/search-params';
// import { getBaseUrl } from '@/utils/url';

type HomePageProps = {
  searchParams: Promise<SearchParams>;
};

const HomePage = async ({ searchParams }: HomePageProps) => {
  //   const baseUrl = getBaseUrl();
  //   console.log(baseUrl);
  
  const resolvedSearchParams = await searchParams;
  const parsedSearchParams = searchParamsCache.parse(resolvedSearchParams);

  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="All Tickets"
        description="Tickets by everyone at one place"
      />
      <ErrorBoundary fallback={<Placeholder label="Failed to load tickets" />}>
        <Suspense fallback={<Spinner />}>
          <TicketList searchParams={parsedSearchParams} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default HomePage;
