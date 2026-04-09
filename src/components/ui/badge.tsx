import type { ComponentProps, ReactNode } from 'react';

import { Badge as ChakraBadge } from '@chakra-ui/react';

type BadgeTone = 'default' | 'secondary' | 'outline' | 'primary' | 'success' | 'warning' | 'danger';

const variantMap: Record<
  BadgeTone,
  { variant: 'subtle' | 'outline' | 'solid'; bg?: string; color?: string; borderColor?: string }
> = {
  default: { variant: 'subtle' },
  secondary: { variant: 'subtle', bg: 'accent.secondary', color: 'fg.default' },
  outline: { variant: 'outline', borderColor: 'border.default' },
  primary: { variant: 'solid' },
  success: { variant: 'subtle', bg: 'status.successBg', color: 'status.success' },
  warning: { variant: 'subtle', bg: 'status.warningBg', color: 'status.warning' },
  danger: { variant: 'subtle', bg: 'status.dangerBg', color: 'status.danger' },
};

type BadgeProps = {
  children: ReactNode;
  tone?: BadgeTone;
} & Omit<ComponentProps<typeof ChakraBadge>, 'variant' | 'children'>;

export function Badge({ children, className, tone = 'default', ...props }: BadgeProps) {
  return (
    <ChakraBadge className={className} {...variantMap[tone]} {...props}>
      {children}
    </ChakraBadge>
  );
}
