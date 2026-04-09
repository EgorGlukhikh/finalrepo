import type { ReactNode } from 'react';

import { Box } from '@chakra-ui/react';

type IconChipProps = {
  icon: ReactNode;
  className?: string;
  tone?: 'default' | 'primary' | 'muted';
};

const toneStyles = {
  default: {
    bg: 'bg.surface',
    color: 'fg.default',
    borderColor: 'border.subtle',
  },
  primary: {
    bg: 'brand.100',
    color: 'fg.brand',
    borderColor: 'transparent',
  },
  muted: {
    bg: 'bg.inset',
    color: 'fg.muted',
    borderColor: 'border.subtle',
  },
} as const;

export function IconChip({ icon, className, tone = 'default' }: IconChipProps) {
  return (
    <Box
      className={className}
      display="inline-flex"
      boxSize="10"
      alignItems="center"
      justifyContent="center"
      borderRadius="2xl"
      borderWidth="1px"
      boxShadow="sm"
      transitionProperty="common"
      transitionDuration="normal"
      {...toneStyles[tone]}
    >
      {icon}
    </Box>
  );
}
