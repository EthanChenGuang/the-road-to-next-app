import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Header from '@/app/_navigation/header/header';
import { Sidebar } from '@/app/_navigation/sidebar/components/sidebar';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Toaster } from '@/components/ui/sonner';

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
    <html suppressHydrationWarning lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider>
          <Header />
          <div className="flex h-screen overflow-hidden border-collapse">
            <Sidebar />
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
          </div>
          <Toaster expand={true} />
        </ThemeProvider>
      </body>
    </html>
  );
}
