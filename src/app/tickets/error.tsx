'use client';

import { useRouter } from 'next/navigation';

import Placeholder from '@/components/placeholder';
import { Button } from '@/components/ui/button';
import { paths } from '@/paths';

export default function Error({ error }: { error: Error }) {
  const router = useRouter();

  const handleRetry = () => {
    router.push(paths.tickets);
    router.refresh();
  };

  return (
    <Placeholder 
      label={error.message || 'Something went wrong'} 
      button={<Button onClick={handleRetry}>Back to Tickets</Button>}
    />
  );
}
