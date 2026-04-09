import { AuthCard } from '@/components/layout/auth-card';
import { SignInForm } from '@/modules/auth/components/sign-in-form';

export default function SignInPage() {
  return (
    <AuthCard
      eyebrow="Вход"
      title="Войти в платформу"
      description="Войдите, чтобы открыть курсы и продолжить обучение."
    >
      <SignInForm />
    </AuthCard>
  );
}
