'use client';

import { Ticket } from '@prisma/client';
import clsx from 'clsx';
import {
  LucideMoreVertical,
  LucidePencil,
  LucideSquareArrowOutUpRight,
  LucideTrash,
} from 'lucide-react';
import Link from 'next/link';

import { ConfirmDialog } from '@/components/confirm-dialog';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { paths } from '@/paths';
import { toCurrencyFromCents } from '@/utils/currency';

import { deleteTicket } from '../actions/delete-ticket';
import { TICKET_ICONS } from '../constants';
import { TicketMoreMenu } from './ticket-more-menu';

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

  const editButton = (
    <Button variant="outline" size="icon" asChild>
      <Link prefetch href={paths.editTicket(ticket.id)}>
        <LucidePencil className="w-4 h-4" />
      </Link>
    </Button>
  );

  const handleDeleteTicket = async () => {
    await deleteTicket(ticket.id);
  };

  // const deleteButton = (
  //   <Button variant="outline" size="icon" onClick={handleDeleteTicket}>
  //     <LucideTrash className="w-4 h-4" />
  //   </Button>
  // );

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

  // const deleteButton = (
  //   <ConfirmDialog
  //     action={deleteTicket.bind(null, ticket.id)}
  //     trigger={
  //       <Button variant="outline" size="icon">
  //         <LucideTrash className="h-4 w-4" />
  //       </Button>
  //     }
  //   />
  // );

  const moreMenu = (
    <TicketMoreMenu
      ticket={ticket}
      trigger={
        <Button variant="outline" size="icon">
          <LucideMoreVertical className="w-4 h-4" />
        </Button>
      }
    />
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
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">{ticket.deadline}</p>
          <p className="text-sm text-muted-foreground">
            {toCurrencyFromCents(ticket.bounty)}
          </p>
        </CardFooter>
      </Card>

      <div className="flex flex-col gap-y-1">
        {isDetail ? (
          <>
            {editButton}
            {/* {deleteButton} */}
            {moreMenu}
          </>
        ) : (
          <>
            {detailButton}
            {editButton}
            {moreMenu}
          </>
        )}
      </div>
    </div>
  );
};

export default TicketItem;
