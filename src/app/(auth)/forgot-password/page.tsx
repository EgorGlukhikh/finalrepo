import { ActionLink } from '@/components/layout';
import { AuthCard } from '@/components/layout/auth-card';

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      eyebrow="Доступ"
      title="Сброс пароля"
      description="Этот шаг мы подключим отдельно, когда будет согласован почтовый контур."
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="max-w-prose text-sm text-muted-foreground">
          Сейчас здесь только честный заглушечный экран без лишней логики.
        </p>
        <ActionLink href="/sign-in" variant="secondary">
          Вернуться ко входу
        </ActionLink>
      </div>
    </AuthCard>
  );
}
