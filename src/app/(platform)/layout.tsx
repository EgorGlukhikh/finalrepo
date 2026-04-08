import type { ReactNode } from 'react';

import { PlatformShell } from '@/components/layout';
import { getPlatformHeaderActions } from '@/modules/auth/shell';

export default async function PlatformLayout({ children }: Readonly<{ children: ReactNode }>) {
  const headerActions = await getPlatformHeaderActions();

  return <PlatformShell headerActions={headerActions}>{children}</PlatformShell>;
}
