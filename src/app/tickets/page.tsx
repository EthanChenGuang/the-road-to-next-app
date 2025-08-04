import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { CardCompact } from '@/components/card-compact';
import Heading from '@/components/heading';
import Placeholder from '@/components/placeholder';
import { Spinner } from '@/components/spinner';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TicketCreateForm } from '@/features/ticket/components/ticket-create-form';
import { TicketList } from '@/features/ticket/components/ticket-list';

//export const dynamic = 'force-dynamic';  // for dynamic data
//export const revalidate = 10; // time based cache for static data (10 seconds)

const TicketsPage = () => {
  return (
    <div className="flex flex-col gap-y-16">
      <Heading title="Tickets" description="All your tickets at one place" />

      <CardCompact
        title="Create Ticket"
        description="A new ticket will be created"
        content={<TicketCreateForm />}
        className="w-full max-w-[420px] self-center"
        classNameTitle="text-2xl font-semibold tracking-tight"
      />

      <ErrorBoundary fallback={<Placeholder label="Failed to load tickets" />}>
        <Suspense fallback={<Spinner />}>
          <TicketList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default TicketsPage;
