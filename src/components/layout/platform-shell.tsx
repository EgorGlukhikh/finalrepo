import type { ReactNode } from 'react';

import { BrandMark } from '@/components/branding';
import { AppHeader } from './app-header';
import { Container } from './container';
import { Stack } from './stack';
import { PlatformNav } from './platform-nav';

type PlatformShellProps = {
  children: ReactNode;
  headerActions: ReactNode;
};

export function PlatformShell({ children, headerActions }: PlatformShellProps) {
  return (
    <div className="min-h-dvh bg-background">
      <AppHeader brand={<BrandMark href="/app" />} actions={headerActions} />
      <Container size="wide" className="py-8 sm:py-10">
        <div className="grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Stack gap="lg" className="rounded-[1.75rem] border border-border/70 bg-surface-elevated/86 p-4 shadow-card ring-1 ring-white/60">
              <div className="space-y-2 px-2">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  Рабочая зона
                </p>
                <p className="text-sm leading-6 text-muted-foreground">
                  Курсы, прогресс и все точки возврата в обучение собраны в одном спокойном контуре.
                </p>
              </div>
              <PlatformNav />
            </Stack>
          </aside>
          <main className="min-w-0">{children}</main>
        </div>
      </Container>
    </div>
  );
}
