import type { ReactNode } from 'react';

import { BrandMark } from '@/components/branding';

import { AdminNav } from './admin-nav';
import { AppHeader } from './app-header';
import { Container } from './container';

type AdminShellProps = {
  children: ReactNode;
  headerActions: ReactNode;
};

export function AdminShell({ children, headerActions }: AdminShellProps) {
  return (
    <div className="min-h-dvh bg-background">
      <AppHeader brand={<BrandMark href="/admin" />} actions={headerActions} />
      <div className="border-b border-border/60 bg-surface/35">
        <Container size="wide" className="py-3">
          <AdminNav orientation="horizontal" />
        </Container>
      </div>
      <Container size="wide" className="py-6 sm:py-8">
        <main className="min-w-0">{children}</main>
      </Container>
    </div>
  );
}
