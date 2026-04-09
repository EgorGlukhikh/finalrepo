import { forwardRef, type ComponentProps } from 'react';

import { Input as ChakraInput } from '@chakra-ui/react';

type InputProps = ComponentProps<typeof ChakraInput>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ className, ...props }, ref) {
  return (
    <ChakraInput
      ref={ref}
      className={className}
      h="11"
      borderRadius="2xl"
      borderColor="border.default"
      bg="bg.surface"
      color="fg.default"
      px="4"
      fontSize="sm"
      _placeholder={{ color: 'fg.subtle' }}
      _hover={{ borderColor: 'border.strong' }}
      _focusVisible={{
        borderColor: 'accent.primary',
        boxShadow: '0 0 0 3px var(--chakra-colors-focus-ring)',
      }}
      _disabled={{ opacity: 0.48, cursor: 'not-allowed' }}
      {...props}
    />
  );
});
