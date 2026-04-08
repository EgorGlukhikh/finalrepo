import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { env } from '@/lib/env';

import '../styles/globals.css';

const metadataBase = env.NEXTAUTH_URL ? new URL(env.NEXTAUTH_URL) : undefined;

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: 'Академия риэлторов',
    template: '%s | Академия риэлторов',
  },
  description:
    'Академия риэлторов — LMS-платформа для обучения: каталог курсов, личный кабинет, прогресс, builder, админка и прозрачный доступ к бесплатным и платным программам.',
  applicationName: 'Академия риэлторов',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ru">
      <body className="bg-background font-sans text-foreground antialiased">{children}</body>
    </html>
  );
}
