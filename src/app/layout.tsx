import './globals.css';

import type { Metadata } from 'next';

import { Providers } from './_providers/providers';

export const metadata: Metadata = {
  title: 'Create My Own Next App',
  description: 'Create my own next app ...',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
