import { LucideLibrary } from 'lucide-react';
import Link from 'next/link';

import { paths } from '@/paths';

import { ThemeSwitcher } from './theme/theme-switcher';
import { buttonVariants } from './ui/button';

const Header = () => {
  return (
    <nav
      className="
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
        <Link
          href={paths.tickets}
          className={buttonVariants({ variant: 'default' })}
        >
          Tickets
        </Link>
      </div>
    </nav>
  );
};

export default Header;
