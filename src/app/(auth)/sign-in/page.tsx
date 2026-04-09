import { AuthCard } from '@/components/layout/auth-card';
import { SignInForm } from '@/modules/auth/components/sign-in-form';

export default function SignInPage() {
  return (
    <AuthCard
      eyebrow="Вход"
      title="Войти в платформу"
      description="Войдите, чтобы вернуться к своим курсам, прогрессу и личному кабинету без лишнего поиска."
    >
      <SignInForm />
    </AuthCard>
  );
}
