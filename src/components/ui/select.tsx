import type { ReactNode, SelectHTMLAttributes } from 'react';

import { NativeSelect } from '@chakra-ui/react';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  children?: ReactNode;
  className?: string;
  placeholder?: string;
};

export function Select({ children, className, placeholder, ...props }: SelectProps) {
  return (
    <NativeSelect.Root size="md" width="full">
      <NativeSelect.Field
        className={className}
        h="11"
        w="full"
        borderRadius="lg"
        borderWidth="1px"
        borderColor="border.default"
        bg="bg.surface"
        color="fg.default"
        px="4"
        pe="10"
        fontSize="sm"
        _hover={{ borderColor: 'border.strong' }}
        _focusVisible={{
          borderColor: 'accent.primary',
          boxShadow: '0 0 0 3px var(--chakra-colors-focus-ring)',
        }}
        _disabled={{ opacity: 0.48, cursor: 'not-allowed' }}
        {...props}
      >
        {placeholder ? (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        ) : null}
        {children}
      </NativeSelect.Field>
      <NativeSelect.Indicator color="fg.subtle" />
    </NativeSelect.Root>
  );
}
