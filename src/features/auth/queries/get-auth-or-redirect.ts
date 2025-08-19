import { redirect } from 'next/navigation';

import { getAuth } from '@/features/auth/queries/get-auth';
import { paths } from '@/paths';

export const getAuthOrRedirect = async () => {
  const auth = await getAuth();
  if (!auth.user) {
    redirect(paths.signIn);
  }
  return auth;
};
