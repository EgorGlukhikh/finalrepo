import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import '../styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Академия риэлторов',
    template: '%s | Академия риэлторов',
  },
  description: 'Foundation scaffold for the Academy Realtors LMS.',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ru">
      <body className="bg-background font-sans text-foreground antialiased">{children}</body>
    </html>
  );
}
