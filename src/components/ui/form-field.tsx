import type { ReactNode } from 'react';

import { Field, HStack, Stack } from '@chakra-ui/react';

import { HelpTooltip } from './help-tooltip';

type FormFieldProps = {
  id: string;
  label: string;
  children: ReactNode;
  description?: string;
  help?: ReactNode;
  error?: string;
  required?: boolean;
  className?: string;
};

export function FormField({
  id,
  label,
  children,
  description,
  help,
  error,
  required,
}: FormFieldProps) {
  return (
    <Field.Root id={id} required={required} invalid={Boolean(error)}>
      <Stack gap="3" align="stretch">
        <Field.Label color="fg.default" fontSize="sm" fontWeight="600" letterSpacing="-0.01em">
          <HStack as="span" gap="2" align="center">
            <span>{label}</span>
            <Field.RequiredIndicator />
            {help ? <HelpTooltip content={help} label={`Пояснение к полю ${label}`} placement="top-start" /> : null}
          </HStack>
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

