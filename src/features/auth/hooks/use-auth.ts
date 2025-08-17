import { User as AuthUser } from 'lucia';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getAuth } from '../queries/get-auth';

const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      const { user } = await getAuth();
      setUser(user);
      setIsLoading(false);
    };

    fetchUser();
  }, [pathname]);

  return { user, isLoading };
};

export { useAuth };
