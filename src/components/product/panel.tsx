import type { ReactNode } from 'react';

import { Box, type BoxProps } from '@chakra-ui/react';

type PanelTone = 'default' | 'muted' | 'highlight' | 'elevated' | 'inset';

const layerStyleByTone = {
  default: 'panel',
  muted: 'panelMuted',
  highlight: 'panelHighlight',
  elevated: 'panelElevated',
  inset: 'inset',
} as const;

type PanelProps = BoxProps & {
  children: ReactNode;
  tone?: PanelTone;
};

export function Panel({ children, tone = 'default', ...props }: PanelProps) {
  return (
    <Box layerStyle={layerStyleByTone[tone]} borderRadius={{ base: '2xl', md: '3xl' }} p={{ base: '5', md: '6' }} {...props}>
      {children}
    </Box>
  );
}
