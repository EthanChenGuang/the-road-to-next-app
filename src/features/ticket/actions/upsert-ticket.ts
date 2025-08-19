'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { setCookieByKey } from '@/actions/cookies';
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';
import { isOwner } from '@/features/auth/utils/is-owner';
import { prisma } from '@/lib/prisma';
import { paths } from '@/paths';
import { toCents } from '@/utils/currency';

const upsertTicketSchema = z.object({
  title: z.string().min(1).max(191),
  content: z.string().min(1).max(1024),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Is required'),
  bounty: z.coerce.number().positive(),
});

const upsertTicket = async (
  id: string | undefined,
  _actionState: ActionState,
  formData: FormData
) => {
  const { user } = await getAuthOrRedirect();

  if (id) {
    const ticket = await prisma.ticket.findUnique({
      where: { id },
    });

    if (!ticket || !isOwner(user, ticket)) {
      return toActionState('ERROR', 'Not authorized');
    }
  }

  try {
    const data = upsertTicketSchema.parse({
      title: formData.get('ticketTitle'),
      content: formData.get('ticketContent'),
      deadline: formData.get('ticketDeadline'),
      bounty: formData.get('ticketBounty'),
    });

    const dbData = {
      ...data,
      bounty: toCents(data.bounty),
      userId: user.id,
    };

    await prisma.ticket.upsert({
      where: { id: id ?? '' },
      update: dbData,
      create: dbData,
    });
  } catch (error) {
    // console.error(error);
    return fromErrorToActionState(error, formData);
  }

  revalidatePath(paths.tickets);

  if (id) {
    await setCookieByKey('toast', 'Ticket updated');
    redirect(paths.tickets);
  }

  return toActionState('SUCCESS', 'Ticket created');
};

export { upsertTicket };
