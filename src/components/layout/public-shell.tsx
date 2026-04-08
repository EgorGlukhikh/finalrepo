import type { ReactNode } from 'react';

import { BrandMark } from '@/components/branding';

import { AppHeader } from './app-header';
import { PublicFooter } from './public-footer';
import { PublicNav } from './public-nav';

type PublicShellProps = {
  children: ReactNode;
  headerActions: ReactNode;
};

export function PublicShell({ children, headerActions }: PublicShellProps) {
  return (
    <div className="min-h-dvh bg-background">
      <AppHeader brand={<BrandMark />} navigation={<PublicNav />} actions={headerActions} />
      <main className="relative">{children}</main>
      <PublicFooter />
    </div>
  );
}
