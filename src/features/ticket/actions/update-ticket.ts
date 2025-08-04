'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { prisma } from '@/lib/prisma';
import { paths } from '@/paths';

const updateTicket = async (formData: FormData) => {
  const id = formData.get('ticketId') as string;
  const title = formData.get('ticketTitle') as string;
  const content = formData.get('ticketContent') as string;

  if (!id) {
    console.error('No ticket ID provided');
    return;
  }

  // Validate on server side but don't throw - just don't create if invalid
  if (!title?.trim() || !content?.trim()) {
    // Just return early without creating - let client side handle validation
    return;
  }

  const data = {
    title: title.trim(),
    content: content.trim(),
  };

  await prisma.ticket.update({
    where: { id },
    data,
  });

  revalidatePath(paths.tickets);
  redirect(paths.tickets);
};

export { updateTicket };
