import type { ReactNode } from 'react';

import { Box } from '@chakra-ui/react';

import { BrandMark } from '@/components/branding';
import { HeaderBar, PageLayout, Panel, SplitPageLayout } from '@/components/product';

import { AppHeader } from './app-header';
import { PlatformNav } from './platform-nav';

type PlatformShellProps = {
  children: ReactNode;
  headerActions: ReactNode;
};

export function PlatformShell({ children, headerActions }: PlatformShellProps) {
  return (
    <Box minH="dvh" bg="bg.canvas">
      <AppHeader brand={<BrandMark href="/app" />} actions={headerActions} />
      <PageLayout>
        <SplitPageLayout
          sidebar={
            <Panel tone="elevated" position={{ xl: 'sticky' }} top={{ xl: '24' }}>
              <HeaderBar
                eyebrow="Рабочая зона"
                title="Личный кабинет"
                description="Курсы, прогресс и точки возврата в обучение собраны в одном спокойном контуре."
              />
              <Box pt="6">
                <PlatformNav />
              </Box>
            </Panel>
          }
          content={<Box minW="0">{children}</Box>}
        />
      </PageLayout>
    </Box>
  );
}
