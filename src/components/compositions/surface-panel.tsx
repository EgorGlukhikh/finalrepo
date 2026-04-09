import type { ReactNode } from 'react';

import { Box, type BoxProps } from '@chakra-ui/react';

type SurfacePanelProps = BoxProps & {
  children: ReactNode;
  tone?: 'default' | 'muted' | 'highlight' | 'inset';
};

const layerStyleByTone = {
  default: 'panel',
  muted: 'panelMuted',
  highlight: 'panelHighlight',
  inset: 'inset',
} as const;

export function SurfacePanel({ children, tone = 'default', ...props }: SurfacePanelProps) {
  return (
    <Box
      layerStyle={layerStyleByTone[tone]}
      borderRadius="xl"
      p={{ base: 5, md: 6 }}
      {...props}
    >
      {children}
    </Box>
  );
}
