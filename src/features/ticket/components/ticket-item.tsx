'use client';

import clsx from 'clsx';
import {
  LucideMoreVertical,
  LucidePencil,
  LucideSquareArrowOutUpRight,
} from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Comments } from '@/features/comment/components/comments';
import { CommentWithMetadata } from '@/features/comment/types';
import { paths } from '@/paths';
import { PaginatedData } from '@/types/pagination';
import { toCurrencyFromCents } from '@/utils/currency';

import { TICKET_ICONS } from '../constants';
import { TicketWithMetadata } from '../types';
import { TicketMoreMenu } from './ticket-more-menu';

type TicketItemProps = {
  ticket: TicketWithMetadata;
  isDetail?: boolean;
  paginatedComments: PaginatedData<CommentWithMetadata>;
};

const TicketItem = ({
  ticket,
  isDetail = true,
  paginatedComments,
}: TicketItemProps) => {
  // const { user } = await getAuth();
  // const isTicketOwner = isOwner(user, ticket);

  const detailButton = (
    <Button variant="outline" size="icon" asChild>
      <Link prefetch href={paths.ticket(ticket.id)}>
        <LucideSquareArrowOutUpRight className="w-4 h-4" />
      </Link>
    </Button>
  );

  const editButton = ticket.isOwner ? (
    <Button variant="outline" size="icon" asChild>
      <Link prefetch href={paths.editTicket(ticket.id)}>
        <LucidePencil className="w-4 h-4" />
      </Link>
    </Button>
  ) : null;

  const moreMenu = ticket.isOwner ? (
    <TicketMoreMenu
      ticket={ticket}
      trigger={
        <Button variant="outline" size="icon">
          <LucideMoreVertical className="w-4 h-4" />
        </Button>
      }
    />
  ) : null;

  return (
    <div
      className={clsx('w-full flex flex-col gap-y-4', {
        'max-w-[420px]': !isDetail,
        'max-w-[580px]': isDetail,
      })}
    >
      <div className="flex gap-x-2">
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
            <p className="text-sm text-muted-foreground">
              {ticket.deadline} by {ticket.user.username}
            </p>
            <p className="text-sm text-muted-foreground">
              {toCurrencyFromCents(ticket.bounty)}
            </p>
          </CardFooter>
        </Card>
        <div className="flex flex-col gap-y-1">
          {isDetail ? (
            <>
              {editButton}
              {moreMenu}
            </>
          ) : (
            <>
              {detailButton}
              {editButton}
            </>
          )}
        </div>
      </div>
      {isDetail && (
        <Suspense
          fallback={
            <div className="flex flex-col gap-y-4">
              <Skeleton className="h-[250px] w-full" />
              <Skeleton className="h-[80px] ml-8" />
              <Skeleton className="h-[80px] ml-8" />
            </div>
          }
        >
          <Comments
            ticketId={ticket.id}
            paginatedComments={paginatedComments}
          />
        </Suspense>
      )}
    </div>
  );
};

export { TicketItem };
