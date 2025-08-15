import { ReactNode, Suspense } from 'react';

import { RedirectToast } from '@/components/redirect-toast';

type RootTemplateProps = {
  children: ReactNode;
};

export default function RootTemplate({ children }: RootTemplateProps) {
  return (
    <div>
      {children}
      <Suspense fallback={null}>
        <RedirectToast />
      </Suspense>
    </div>
  );
}
