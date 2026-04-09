import type { ReactNode } from 'react';

import { Box } from '@chakra-ui/react';

type CardPadding = 'none' | 'sm' | 'md' | 'lg';
type CardTone = 'default' | 'muted' | 'highlight';

const paddingMap: Record<CardPadding, string> = {
  none: '0',
  sm: '4',
  md: '5',
  lg: '6',
};

const layerStyleMap: Record<CardTone, string> = {
  default: 'panel',
  muted: 'panelMuted',
  highlight: 'panelHighlight',
};

type CardProps = {
  children: ReactNode;
  className?: string;
  padding?: CardPadding;
  tone?: CardTone;
  [key: string]: unknown;
};

export function Card({ children, className, padding = 'md', tone = 'default', ...props }: CardProps) {
  return (
    <Box
      className={className}
      layerStyle={layerStyleMap[tone]}
      borderRadius="3xl"
      p={paddingMap[padding]}
      {...props}
    >
      {children}
    </Box>
  );
}
