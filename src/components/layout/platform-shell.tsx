import type { ReactNode } from 'react';

import { Box, Heading, Stack, Text } from '@chakra-ui/react';

import { BrandMark } from '@/components/branding';
import { PageLayout, SplitPageLayout } from '@/components/product';

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
            <Stack gap="6" position={{ xl: 'sticky' }} top={{ xl: '24' }}>
              <Stack gap="3">
                <Text textStyle="overline" color="fg.subtle">
                  Рабочая зона
                </Text>
                <Heading textStyle="sectionTitle">Личный кабинет</Heading>
                <Text textStyle="bodyMuted" color="fg.muted">
                  Курсы, прогресс и точки возврата в обучение собраны в одном спокойном месте.
                </Text>
              </Stack>
              <Box pt="1">
                <PlatformNav />
              </Box>
            </Stack>
          }
          content={<Box minW="0">{children}</Box>}
        />
      </PageLayout>
    </Box>
  );
}
