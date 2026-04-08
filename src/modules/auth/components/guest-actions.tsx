import { ActionLink } from '@/components/layout';

export function GuestActions() {
  return (
    <div className="flex items-center gap-2">
      <ActionLink href="/sign-in" variant="ghost">
        Войти
      </ActionLink>
      <ActionLink href="/sign-up" variant="primary">
        Создать аккаунт
      </ActionLink>
    </div>
  );
}
