import type { ComponentProps, ReactNode } from 'react';

import { Button as ChakraButton } from '@chakra-ui/react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

type ChakraButtonVariant = 'solid' | 'surface' | 'ghost' | 'outline';

const variantMap: Record<
  ButtonVariant,
  { variant: ChakraButtonVariant; bg?: string; color?: string; _hover?: object; _active?: object }
> = {
  primary: { variant: 'solid' },
  secondary: { variant: 'surface' },
  ghost: { variant: 'ghost' },
  outline: { variant: 'outline' },
  danger: {
    variant: 'solid',
    bg: 'status.danger',
    color: 'white',
    _hover: { filter: 'brightness(0.94)' },
    _active: { filter: 'brightness(0.88)' },
  },
};

type ButtonProps = {
  children: ReactNode;
  loading?: boolean;
  loadingText?: ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
} & Omit<ComponentProps<typeof ChakraButton>, 'variant' | 'size' | 'children'>;

export function Button({
  children,
  className,
  loading = false,
  loadingText,
  size = 'md',
  type = 'button',
  variant = 'primary',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <ChakraButton
      className={className}
      type={type}
      size={size}
      loading={loading}
      loadingText={loadingText}
      disabled={disabled || loading}
      {...variantMap[variant]}
      {...props}
    >
      {children}
    </ChakraButton>
  );
}
