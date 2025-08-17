'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { lucia } from '@/lib/lucia';
import { paths } from '@/paths';

import { getAuth } from '../queries/get-auth';

export const signOut = async () => {
  const result = await getAuth();

  if (!result.session) {
    redirect(paths.signIn);
  }

  // Invalidate user's current session on the server
  await lucia.invalidateSession(result.session.id);

  const sessionCookie = lucia.createBlankSessionCookie();

  // Set the session cookie to an empty value to invalidate it on the client
  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  redirect(paths.signIn);
};
