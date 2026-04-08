import type { ReactNode } from 'react';

import { AdminShell } from '@/components/layout';
import { getAdminHeaderActions } from '@/modules/auth/shell';

export default async function AdminLayout({ children }: Readonly<{ children: ReactNode }>) {
  const headerActions = await getAdminHeaderActions();

  return <AdminShell headerActions={headerActions}>{children}</AdminShell>;
}
