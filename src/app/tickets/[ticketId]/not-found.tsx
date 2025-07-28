import Link from 'next/link';

import Placeholder from '@/components/placeholder';
import { Button } from '@/components/ui/button';
import { paths } from '@/paths';

export default function NotFound() {
  return (
    <Placeholder
      label="Ticket not found"
      button={
        <Button variant="outline" asChild>
          <Link href={paths.tickets}>Go to Tickets</Link>
        </Button>
      }
    />
  );
}
