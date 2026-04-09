import type { ReactNode } from 'react';

import { Button, type ButtonProps } from '@chakra-ui/react';
import Link from 'next/link';

type ButtonLinkProps = Omit<ButtonProps, 'children'> & {
  href: string;
  children: ReactNode;
};

export function ButtonLink({ href, children, ...props }: ButtonLinkProps) {
  return (
    <Button asChild {...props}>
      <Link href={href}>{children}</Link>
    </Button>
  );
}
