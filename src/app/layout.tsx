import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter, Manrope } from 'next/font/google';

import { ChakraAppProvider } from '@/components/ui/chakra-provider';
import { env } from '@/lib/env';

import '../styles/globals.css';

const metadataBase = env.NEXTAUTH_URL ? new URL(env.NEXTAUTH_URL) : undefined;
const bodyFont = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-body',
  display: 'swap',
});
const headingFont = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-heading',
  display: 'swap',
});
const labelFont = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-label',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: 'Академия риэлторов',
    template: '%s | Академия риэлторов',
  },
  description: 'Академия риэлторов: курсы, личный кабинет и админка в одной рабочей системе.',
  applicationName: 'Академия риэлторов',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${bodyFont.variable} ${headingFont.variable} ${labelFont.variable}`}>
        <ChakraAppProvider>{children}</ChakraAppProvider>
      </body>
    </html>
  );
}
