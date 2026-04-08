import type { ReactNode } from 'react';

import { BrandMark } from '@/components/branding';

import { Container } from './container';
import { Stack } from './stack';

type AuthShellProps = {
  children: ReactNode;
};

export function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="min-h-dvh bg-background">
      <main className="flex min-h-dvh items-center py-10 sm:py-16">
        <Container size="content">
          <Stack gap="lg">
            <div className="flex justify-center">
              <BrandMark />
            </div>
            {children}
          </Stack>
        </Container>
      </main>
    </div>
  );
}
