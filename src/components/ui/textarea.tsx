import { forwardRef, type ComponentProps } from 'react';

import { Textarea as ChakraTextarea } from '@chakra-ui/react';

type TextareaProps = ComponentProps<typeof ChakraTextarea>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, rows = 4, ...props },
  ref,
) {
  return (
    <ChakraTextarea
      ref={ref}
      className={className}
      rows={rows}
      minH="28"
      borderRadius="2xl"
      borderColor="border.default"
      bg="bg.surface"
      color="fg.default"
      px="4"
      py="3"
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
