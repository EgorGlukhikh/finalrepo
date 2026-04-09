import type { SelectHTMLAttributes } from 'react';

import { chakra } from '@chakra-ui/react';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  className?: string;
};

export function Select({ className, ...props }: SelectProps) {
  return (
    <chakra.select
      className={className}
      h="11"
      w="full"
      borderRadius="2xl"
      borderWidth="1px"
      borderColor="border.default"
      bg="bg.surface"
      color="fg.default"
      px="4"
      fontSize="sm"
      _hover={{ borderColor: 'border.strong' }}
      _focusVisible={{
        borderColor: 'accent.primary',
        boxShadow: '0 0 0 3px var(--chakra-colors-focus-ring)',
      }}
      _disabled={{ opacity: 0.48, cursor: 'not-allowed' }}
      {...props}
    />
  );
}
