'use client';

import { Ticket } from '@prisma/client';
import clsx from 'clsx';
import { LucideSquareArrowOutUpRight, LucideTrash } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { paths } from '@/paths';

import { deleteTicket } from '../actions/delete-ticket';
import { TICKET_ICONS } from '../constants';

type TicketItemProps = {
  ticket: Ticket;
  isDetail?: boolean;
};

const TicketItem = ({ ticket, isDetail = true }: TicketItemProps) => {
  // console.log('where am I displaying (TicketItem)?');
  const detailButton = (
    <Button variant="outline" size="icon" asChild>
      <Link prefetch href={paths.ticket(ticket.id)}>
        <LucideSquareArrowOutUpRight className="w-4 h-4" />
      </Link>
    </Button>
  );

  const handleDeleteTicket = async () => {
    await deleteTicket(ticket.id);
  };

  const deleteButton = (
    <Button variant="outline" size="icon" onClick={handleDeleteTicket}>
      <LucideTrash className="w-4 h-4" />
    </Button>
  );

  // TODO: Implement server action for delete ticket
  /*
  const deleteButton = (
    <form action={deleteTicket.bind(null, ticket.id)}>
      <Button variant="outline" size="icon">
        <LucideTrash className="h-4 w-4" />
      </Button>
    </form>
  );
  */
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

      <div className="flex flex-col gap-y-1">
        {isDetail ? deleteButton : detailButton}
      </div>
    </div>
  );
};

export default TicketItem;
