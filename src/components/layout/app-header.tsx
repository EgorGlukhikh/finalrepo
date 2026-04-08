import type { ReactNode } from 'react';

import { Container } from './container';
import { Inline } from './inline';

type AppHeaderProps = {
  brand: ReactNode;
  navigation?: ReactNode;
  actions?: ReactNode;
};

export function AppHeader({ brand, navigation, actions }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/78 backdrop-blur-xl supports-[backdrop-filter]:bg-background/72">
      <Container size="wide" className="py-4">
        <div className="rounded-3xl border border-border/70 bg-surface/88 px-4 py-3 shadow-card ring-1 ring-white/65 sm:px-5">
          <Inline justify="between" align="center" wrap>
            <div className="flex items-center gap-5">
            {brand}
              {navigation ? <div className="hidden md:block">{navigation}</div> : null}
            </div>
            {actions ? <div className="flex flex-wrap items-center justify-end gap-3">{actions}</div> : null}
          </Inline>
        </div>
      </Container>
    </header>
  );
}
