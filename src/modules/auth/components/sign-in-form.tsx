'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState, type FormEvent } from 'react';

import { ActionLink, Stack } from '@/components/layout';
import { Button, FormField, Input } from '@/components/ui';

type SignInFormState = {
  email: string;
  password: string;
};

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/app';
  const registered = searchParams.get('registered') === '1';

  const [values, setValues] = useState<SignInFormState>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(searchParams.get('error') ? 'Проверьте email и пароль' : null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn('credentials', {
      email: values.email,
      password: values.password,
      callbackUrl,
      redirect: false,
    });

    setLoading(false);

    if (!result || result.error) {
      setError('Не удалось войти. Проверьте email и пароль.');
      return;
    }

    router.push(result.url ?? callbackUrl);
    router.refresh();
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <Stack gap="md">
        {registered ? (
          <p className="rounded-lg border border-border bg-surface-muted px-4 py-3 text-sm text-foreground">
            Аккаунт создан. Теперь войдите в систему.
          </p>
        ) : null}
        <FormField id="sign-in-email" label="Email" required error={error ?? undefined}>
          <Input
            id="sign-in-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))}
            required
          />
        </FormField>
        <FormField id="sign-in-password" label="Пароль" required>
          <Input
            id="sign-in-password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={values.password}
            onChange={(event) => setValues((current) => ({ ...current, password: event.target.value }))}
            required
          />
        </FormField>
      </Stack>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <ActionLink href="/forgot-password" variant="ghost">
          Забыл пароль
        </ActionLink>
        <Button type="submit" loading={loading}>
          Войти
        </Button>
      </div>
    </form>
  );
}
