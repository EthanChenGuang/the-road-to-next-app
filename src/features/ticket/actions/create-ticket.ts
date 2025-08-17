'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { getAuth } from '@/features/auth/queries/get-auth';
import { prisma } from '@/lib/prisma';
import { paths } from '@/paths';

const createTicket = async (formData: FormData) => {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const deadline = formData.get('deadline') as string;
  const bounty = formData.get('bounty') as string;

  // Validate on server side but don't throw - just don't create if invalid
  if (
    !title?.trim() ||
    !content?.trim() ||
    !deadline?.trim() ||
    !bounty?.trim()
  ) {
    // Just return early without creating - let client side handle validation
    return;
  }

  const { user } = await getAuth();

  if (!user) {
    redirect(paths.signIn);
  }

  try {
    const data = {
      title: title.trim(),
      content: content.trim(),
      deadline: deadline.trim(),
      bounty: parseInt(bounty) * 100,
      userId: user.id,
    };

    await prisma.ticket.create({
      data,
    });

    revalidatePath(paths.tickets);
    redirect(paths.tickets);
  } catch (error) {
    console.error('Failed to create ticket:', error);
    // Don't throw here either - just log and return
    return;
  }
};

export { createTicket };
