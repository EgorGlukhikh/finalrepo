import type { HTMLAttributes } from 'react';

import { Separator as ChakraSeparator } from '@chakra-ui/react';

export function Separator({ className, ...props }: HTMLAttributes<HTMLHRElement>) {
  return <ChakraSeparator className={className} borderColor="border.default" {...props} />;
}
