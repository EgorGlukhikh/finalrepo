import type { ReactNode } from 'react';

import { PublicShell } from '@/components/layout';
import { getPublicHeaderActions } from '@/modules/auth/shell';

export default async function PublicLayout({ children }: Readonly<{ children: ReactNode }>) {
  const headerActions = await getPublicHeaderActions();

  return <PublicShell headerActions={headerActions}>{children}</PublicShell>;
}
