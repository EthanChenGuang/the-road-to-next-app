'use client';

import { LucideLibrary } from 'lucide-react';
import Link from 'next/link';

import { useAuth } from '@/features/auth/hooks/use-auth';
import { paths } from '@/paths';

import { ThemeSwitcher } from '../../../components/theme/theme-switcher';
import { buttonVariants } from '../../../components/ui/button';
import { AccountDropdown } from './account-dropdown';

const Header = () => {
  const { user, isFetched } = useAuth();

  if (!isFetched) {
    return null;
  }

  const navItems = user ? (
    // <form action={signOut}>
    //   <SubmitButton icon={<LucideLogOut />} />
    // </form>
    <AccountDropdown user={user} />
  ) : (
    <>
      <Link
        href={paths.signUp}
        className={buttonVariants({ variant: 'outline' })}
      >
        Sign Up
      </Link>
      <Link
        href={paths.signIn}
        className={buttonVariants({ variant: 'default' })}
      >
        Sign In
      </Link>
    </>
  );

  return (
    <nav
      className="
        animate-header-from-top
        supports-backdrop-blur:bg-background/60
        fixed left-0 right-0 top-0 z-20
        border-b bg-background/95 backdrop-blur
        w-full flex py-2.5 px-5 justify-between
      "
    >
      <div>
        <h1 className="text-lg font-semibold">
          <Link
            href={paths.home}
            className="flex items-center gap-x-2 hover:opacity-80 transition-opacity"
          >
            <LucideLibrary />
            Ticket Management
          </Link>
        </h1>
      </div>
      <div className="flex items-center gap-x-2">
        <ThemeSwitcher />
        {navItems}
      </div>
    </nav>
  );
};

export default Header;
