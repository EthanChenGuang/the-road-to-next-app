'use server';

import { verify } from '@node-rs/argon2';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import { lucia } from '@/lib/lucia';
import { prisma } from '@/lib/prisma';
import { paths } from '@/paths';

const signInSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }).max(191),
  password: z.string().min(6).max(191),
});

const signIn = async (_actionState: ActionState, formData: FormData) => {
  try {
    const { email, password } = signInSchema.parse(
      Object.fromEntries(formData)
    );

    // Sign in
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return toActionState('ERROR', 'Invalid email or password', formData);
    }

    const isPasswordValid = await verify(user.passwordHash, password);

    if (!isPasswordValid) {
      return toActionState('ERROR', 'Invalid email or password', formData);
    }
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    (await cookies()).set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  redirect(paths.tickets);
};

export { signIn };
