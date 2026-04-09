import Link, { type LinkProps } from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

import { Button } from '@chakra-ui/react';

type ActionLinkVariant = 'primary' | 'secondary' | 'ghost' | 'outline';

type ChakraButtonVariant = ComponentProps<typeof Button>['variant'];

const buttonVariantMap: Record<ActionLinkVariant, ChakraButtonVariant> = {
  primary: 'solid',
  secondary: 'surface',
  ghost: 'ghost',
  outline: 'outline',
};

type ActionLinkProps = {
  children: ReactNode;
  variant?: ActionLinkVariant;
} & LinkProps &
  Omit<ComponentProps<typeof Button>, 'asChild' | 'children' | 'variant'>;

export function ActionLink({
  children,
  className,
  variant = 'secondary',
  href,
  replace,
  scroll,
  shallow,
  prefetch,
  locale,
  ...buttonProps
}: ActionLinkProps) {
  return (
    <Button asChild className={className} variant={buttonVariantMap[variant]} {...buttonProps}>
      <Link href={href} replace={replace} scroll={scroll} shallow={shallow} prefetch={prefetch} locale={locale}>
        {children}
      </Link>
    </Button>
  );
}
