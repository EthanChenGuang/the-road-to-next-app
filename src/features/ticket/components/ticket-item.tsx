import clsx from 'clsx';
import { LucideSquareArrowOutUpRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { paths } from '@/paths';

import { TICKET_ICONS } from '../constants';
import { Ticket } from '../types';

type TicketItemProps = {
  ticket: Ticket;
  isDetail?: boolean;
};

const TicketItem = ({ ticket, isDetail = true }: TicketItemProps) => {
  // console.log('where am I displaying (TicketItem)?');
  const detailButton = (
    <Button variant="outline" size="icon" asChild>
      <Link href={paths.ticket(ticket.id)}>
        <LucideSquareArrowOutUpRight className="w-4 h-4" />
      </Link>
    </Button>
  );

  return (
    <div
      className={clsx('w-full flex gap-x-1', {
        'max-w-[420px]': !isDetail,
        'max-w-[580px]': isDetail,
      })}
    >
      <Card key={ticket.id} className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-x-2">
            <span>
              {TICKET_ICONS[ticket.status as keyof typeof TICKET_ICONS]}
            </span>
            <span className="text-2xl font-semibold truncate">
              {ticket.title}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span
            className={clsx('whitespace-break-spaces', {
              'line-clamp-3': !isDetail,
            })}
          >
            {ticket.content}
          </span>
        </CardContent>
      </Card>

      {!isDetail && (
        <div className="flex flex-col gap-y-1">
          {detailButton}
          {detailButton}
        </div>
      )}
    </div>
  );
};

export default TicketItem;
