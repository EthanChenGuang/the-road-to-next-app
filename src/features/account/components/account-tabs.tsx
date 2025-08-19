'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { paths } from '@/paths';

export const AccountTabs = () => {
  const pathname = usePathname();
  return (
    <Tabs defaultValue="profile" value={pathname.split('/').at(-1)}>
      <TabsList>
        <TabsTrigger value="profile" asChild>
          <Link href={paths.accountProfile}>Profile</Link>
        </TabsTrigger>
        <TabsTrigger value="password" asChild>
          <Link href={paths.accountPassword}>Password</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
