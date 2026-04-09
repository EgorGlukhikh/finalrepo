import { AuthCard } from '@/components/layout/auth-card';
import { SignUpForm } from '@/modules/auth/components/sign-up-form';

export default function SignUpPage() {
  return (
    <AuthCard
      eyebrow="Регистрация"
      title="Создать аккаунт"
      description="Аккаунт нужен, чтобы открыть курсы, сохранить прогресс и продолжать обучение с того места, где вы остановились."
    >
      <SignUpForm />
    </AuthCard>
  );
}
