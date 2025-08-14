'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { setCookieByKey } from '@/actions/cookies';
import { fromErrorToActionState } from '@/components/form/utils/to-action-state';
import { prisma } from '@/lib/prisma';
import { paths } from '@/paths';

export const deleteTicket = async (ticketId: string) => {
  try {
    await prisma.ticket.delete({
      where: {
        id: ticketId,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(paths.tickets);
  await setCookieByKey('toast', 'Ticket deleted');
  // Add timestamp to force navigation trigger
  redirect(`${paths.tickets}?deleted=${Date.now()}`);
};
