import type { ReactNode } from 'react';

import { Box, Heading, Stack, Text } from '@chakra-ui/react';

import { Card } from '@/components/ui';

type AuthCardProps = {
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function AuthCard({ eyebrow, title, description, children, footer }: AuthCardProps) {
  return (
    <Card padding="lg">
      <Stack gap="6">
        <Stack gap="2">
          <Text textStyle="overline" color="fg.subtle">
            {eyebrow}
          </Text>
          <Heading as="h1" textStyle="pageTitle">
            {title}
          </Heading>
          {description ? (
            <Text textStyle="bodyMuted" color="fg.muted" maxW="prose">
              {description}
            </Text>
          ) : null}
        </Stack>
        {children}
        {footer ? (
          <Box pt="4" borderTopWidth="1px" borderColor="border.subtle">
            {footer}
          </Box>
        ) : null}
      </Stack>
    </Card>
  );
}
