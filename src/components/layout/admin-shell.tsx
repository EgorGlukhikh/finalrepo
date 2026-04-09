import type { ReactNode } from 'react';

import { Box, Heading, Stack, Text } from '@chakra-ui/react';

import { BrandMark } from '@/components/branding';
import { PageLayout, SplitPageLayout } from '@/components/product';

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
            <Stack gap="6" position={{ xl: 'sticky' }} top={{ xl: '24' }}>
              <Stack gap="3">
                <Text textStyle="overline" color="fg.subtle">
                  Админка
                </Text>
                <Heading textStyle="sectionTitle">Операционный контур</Heading>
              </Stack>
              <Box pt="1">
                <AdminNav />
              </Box>
            </Stack>
          }
          content={<Box minW="0">{children}</Box>}
        />
      </PageLayout>
    </Box>
  );
}
