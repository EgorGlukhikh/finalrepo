import type { ReactNode } from 'react';

import { Box } from '@chakra-ui/react';

import { BrandMark } from '@/components/branding';
import { HeaderBar, PageLayout, Panel, SplitPageLayout } from '@/components/product';

import { AdminNav } from './admin-nav';
import { AppHeader } from './app-header';

type AdminShellProps = {
  children: ReactNode;
  headerActions: ReactNode;
};

export function AdminShell({ children, headerActions }: AdminShellProps) {
  return (
    <Box minH="dvh" bg="bg.canvas">
      <AppHeader brand={<BrandMark href="/admin" />} actions={headerActions} />
      <PageLayout spacing="lg">
        <SplitPageLayout
          sidebar={
            <Panel tone="elevated" position={{ xl: 'sticky' }} top={{ xl: '24' }}>
              <HeaderBar
                eyebrow="Админка"
                title="Операционный контур"
                description="Доступы, курсы, пользователи и оплаты собраны в одном системном рабочем слое."
              />
              <Box pt="6">
                <AdminNav />
              </Box>
            </Panel>
          }
          content={<Box minW="0">{children}</Box>}
        />
      </PageLayout>
    </Box>
  );
}
