'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { deleteCookieByKey, getCookieByKey } from '@/actions/cookies';

const RedirectToast = () => {
  const pathname = usePathname();

  useEffect(() => {
    let hasRun = false;

    const fetchCookieShowToast = async () => {
      // Prevent duplicate execution in strict mode
      if (hasRun) return;
      hasRun = true;

      const message = await getCookieByKey('toast');
      if (message) {
        await deleteCookieByKey('toast');
        toast.success(message);
      }
    };
    fetchCookieShowToast();
  }, [pathname]);

  return null;
};

export { RedirectToast };
