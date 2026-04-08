import { AuthCard } from '@/components/layout/auth-card';
import { SignUpForm } from '@/modules/auth/components/sign-up-form';

export default function SignUpPage() {
  return (
    <AuthCard
      eyebrow="Регистрация"
      title="Создать аккаунт"
      description="Аккаунт нужен для доступа к курсам и личному кабинету. Сейчас создаем только базовый вход."
    >
      <SignUpForm />
    </AuthCard>
  );
}
