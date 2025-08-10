'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { setCookieByKey } from '@/actions/cookies';
import { prisma } from '@/lib/prisma';
import { paths } from '@/paths';

export const deleteTicket = async (ticketId: string) => {
  await prisma.ticket.delete({
    where: { id: ticketId },
  });

  revalidatePath(paths.tickets);
  await setCookieByKey('toast', 'Ticket deleted');
  redirect(paths.tickets);
};
