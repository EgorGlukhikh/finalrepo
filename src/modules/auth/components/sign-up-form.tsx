'use client';

import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';

import { ActionLink, Stack } from '@/components/layout';
import { Button, FormField, Input } from '@/components/ui';

type SignUpFormState = {
  name: string;
  email: string;
  password: string;
};

export function SignUpForm() {
  const router = useRouter();
  const [values, setValues] = useState<SignUpFormState>({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    setLoading(false);

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as { error?: string } | null;

      if (payload?.error === 'EMAIL_TAKEN') {
        setError('Пользователь с таким email уже существует.');
        return;
      }

      setError('Не удалось создать аккаунт.');
      return;
    }

    router.push('/sign-in?registered=1');
    router.refresh();
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <Stack gap="md">
        <FormField id="sign-up-name" label="Имя">
          <Input
            id="sign-up-name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(event) => setValues((current) => ({ ...current, name: event.target.value }))}
          />
        </FormField>
        <FormField id="sign-up-email" label="Email" required error={error ?? undefined}>
          <Input
            id="sign-up-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))}
            required
          />
        </FormField>
        <FormField id="sign-up-password" label="Пароль" required description="Минимум 8 символов">
          <Input
            id="sign-up-password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={values.password}
            onChange={(event) => setValues((current) => ({ ...current, password: event.target.value }))}
            required
          />
        </FormField>
      </Stack>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <ActionLink href="/sign-in" variant="ghost">
          Уже есть аккаунт
        </ActionLink>
        <Button type="submit" loading={loading}>
          Создать аккаунт
        </Button>
      </div>
    </form>
  );
}
