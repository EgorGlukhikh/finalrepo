import { HStack, Text } from '@chakra-ui/react';

import { ActionLink } from '@/components/layout';
import { AuthCard } from '@/components/layout/auth-card';

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      eyebrow="Доступ"
      title="Сброс пароля"
      description="Этот шаг мы подключим отдельно, когда будет согласован почтовый контур."
    >
      <HStack justify="space-between" align="center" gap="3" flexWrap="wrap">
        <Text textStyle="bodyMuted" color="fg.muted" maxW="prose">
          Сейчас здесь только честный заглушечный экран без лишней логики.
        </Text>
        <ActionLink href="/sign-in" variant="secondary">
          Вернуться ко входу
        </ActionLink>
      </HStack>
    </AuthCard>
  );
}
