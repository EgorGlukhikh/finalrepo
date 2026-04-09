import type { LabelHTMLAttributes } from 'react';

import { chakra } from '@chakra-ui/react';

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  className?: string;
};

export function Label({ className, ...props }: LabelProps) {
  return <chakra.label className={className} textStyle="label" color="fg.default" display="block" {...props} />;
}
