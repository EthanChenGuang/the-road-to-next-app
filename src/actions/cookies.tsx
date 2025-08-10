'use server';

import { cookies } from 'next/headers';

export const setCookieByKey = async (key: string, value: string) => {
  (await cookies()).set(key, value);
};

export const getCookieByKey = async (key: string) => {
  return (await cookies()).get(key)?.value;
};

export const deleteCookieByKey = async (key: string) => {
  (await cookies()).delete(key);
};
