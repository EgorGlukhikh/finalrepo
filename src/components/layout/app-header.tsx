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
    <header className="border-b border-border/70 bg-background/90 backdrop-blur">
      <Container size="wide" className="py-4">
        <Inline justify="between" align="center" wrap>
          <div className="flex items-center gap-6">
            {brand}
            {navigation ? <div className="hidden md:block">{navigation}</div> : null}
          </div>
          {actions ? <div className="flex flex-wrap items-center justify-end gap-3">{actions}</div> : null}
        </Inline>
      </Container>
    </header>
  );
}
