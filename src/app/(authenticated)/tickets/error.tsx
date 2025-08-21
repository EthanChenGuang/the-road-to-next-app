'use client';

import { useRouter } from 'next/navigation';

import Placeholder from '@/components/placeholder';
import { Button } from '@/components/ui/button';
import { paths } from '@/paths';

export default function Error({ error }: { error: Error }) {
  const router = useRouter();

  const handleRetry = () => {
    router.replace(paths.tickets);
  };

  return (
    <Placeholder 
      label={error.message || 'Something went wrong'} 
      button={<Button onClick={handleRetry}>Back to Tickets</Button>}
    />
  );
}
