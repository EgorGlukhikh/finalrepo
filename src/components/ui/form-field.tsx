import type { ReactNode } from 'react';

import { Field, Stack } from '@chakra-ui/react';

type FormFieldProps = {
  id: string;
  label: string;
  children: ReactNode;
  description?: string;
  error?: string;
  required?: boolean;
  className?: string;
};

export function FormField({
  id,
  label,
  children,
  description,
  error,
  required,
}: FormFieldProps) {
  return (
    <Field.Root id={id} required={required} invalid={Boolean(error)}>
      <Stack gap="3" align="stretch">
        <Field.Label color="fg.default" fontSize="sm" fontWeight="600" letterSpacing="-0.01em">
          {label}
          <Field.RequiredIndicator />
        </Field.Label>
        {children}
        {error ? (
          <Field.ErrorText>{error}</Field.ErrorText>
        ) : description ? (
          <Field.HelperText color="fg.muted">{description}</Field.HelperText>
        ) : null}
      </Stack>
    </Field.Root>
  );
}

