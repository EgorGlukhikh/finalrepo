import type { ReactNode } from 'react';

import { BrandMark } from '@/components/branding';
import { Card } from '@/components/ui';

import { AppHeader } from './app-header';
import { Container } from './container';
import { Stack } from './stack';
import { AdminNav } from './admin-nav';

type AdminShellProps = {
  children: ReactNode;
  headerActions: ReactNode;
};

export function AdminShell({ children, headerActions }: AdminShellProps) {
  return (
    <div className="min-h-dvh bg-background">
      <AppHeader brand={<BrandMark href="/admin" />} actions={headerActions} />
      <Container size="wide" className="py-6 sm:py-8">
        <div className="grid gap-6 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Card padding="md">
              <Stack gap="lg">
                <div>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Администрирование
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Отдельный контур для управления курсами, заказами и пользователями.
                  </p>
                </div>
                <AdminNav />
              </Stack>
            </Card>
          </aside>
          <main className="min-w-0">{children}</main>
        </div>
      </Container>
    </div>
  );
}
