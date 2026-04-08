import type { ReactNode } from 'react';

import { AuthShell } from '@/components/layout';
import { requireGuest } from '@/modules/auth/access';

export default async function AuthLayout({ children }: Readonly<{ children: ReactNode }>) {
  await requireGuest();

  return <AuthShell>{children}</AuthShell>;
}
