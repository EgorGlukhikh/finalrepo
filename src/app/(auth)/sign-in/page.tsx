import { AuthCard } from '@/components/layout/auth-card';
import { SignInForm } from '@/modules/auth/components/sign-in-form';

export default function SignInPage() {
  return (
    <AuthCard
      eyebrow="Вход"
      title="Войти в платформу"
      description="Используйте email и пароль, чтобы попасть в рабочую зону Академии риэлторов."
    >
      <SignInForm />
    </AuthCard>
  );
}
