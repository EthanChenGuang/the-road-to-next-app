import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { paths } from '@/paths';

export const metadata: Metadata = {
  title: 'Create My Own Next App',
  description: 'Create my own next app ...',
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav
          className="
            supports-backdrop-blur:bg-background/60
            fixed left-0 right-0 top-0 z-20
            border-b bg-background/95 backdrop-blur
            w-full flex py-2.5 px-5 justify-between
            "
        >
          <div>
            <Button variant="outline" asChild>
              <Link href={paths.home}>Home</Link>
            </Button>
          </div>
          <div>
            <Button variant="outline" asChild>
              <Link href={paths.tickets}>Tickets</Link>
            </Button>
          </div>
        </nav>
        <main
          className="
        min-h-screen flex-1
        overflow-y-auto overflow-x-hidden
        py-24 px-8
        bg-secondary/20
        flex flex-col
      "
        >
          {children}
        </main>
      </body>
    </html>
  );
}
