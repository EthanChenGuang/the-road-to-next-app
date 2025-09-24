'use client';

import Header from '@/app/_navigation/header/header';
import { Sidebar } from '@/app/_navigation/sidebar/components/sidebar';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Toaster } from '@/components/ui/sonner';

import { ReactQueryProvider } from './react-query/react-query-provider';

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <ReactQueryProvider>
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
      </ReactQueryProvider>
    </ThemeProvider>
  );
}