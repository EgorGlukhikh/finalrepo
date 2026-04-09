import type { ElementType, ReactNode } from 'react';

import { Box } from '@chakra-ui/react';

import { Container } from './container';

type SectionTone = 'default' | 'muted';
type SectionPadding = 'sm' | 'md' | 'lg';

const paddingMap: Record<SectionPadding, { base: string; md: string }> = {
  sm: { base: '10', md: '12' },
  md: { base: '12', md: '16' },
  lg: { base: '16', md: '24' },
};

type SectionProps<T extends ElementType = 'section'> = {
  as?: T;
  children: ReactNode;
  className?: string;
  tone?: SectionTone;
  padding?: SectionPadding;
};

export function Section<T extends ElementType = 'section'>({
  as,
  children,
  className,
  tone = 'default',
  padding = 'md',
  ...props
}: SectionProps<T>) {
  return (
    <Box
      as={(as ?? 'section') as ElementType}
      className={className}
      py={paddingMap[padding]}
      bg={tone === 'muted' ? 'bg.subtle' : 'transparent'}
      borderTopWidth={tone === 'muted' ? '1px' : undefined}
      borderBottomWidth={tone === 'muted' ? '1px' : undefined}
      borderColor={tone === 'muted' ? 'border.subtle' : undefined}
      {...props}
    >
      <Container>{children}</Container>
    </Box>
  );
}
