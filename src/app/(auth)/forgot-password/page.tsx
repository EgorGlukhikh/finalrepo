import { HStack, Text } from '@chakra-ui/react';

import { ActionLink } from '@/components/layout';
import { AuthCard } from '@/components/layout/auth-card';

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      eyebrow="Доступ"
      title="Сброс пароля"
      description="Сброс пароля временно недоступен."
    >
      <HStack justify="space-between" align="center" gap="3" flexWrap="wrap">
        <Text textStyle="bodyMuted" color="fg.muted" maxW="prose">
          Используйте текущий пароль или обратитесь к администратору платформы.
        </Text>
        <ActionLink href="/sign-in" variant="secondary">
          Вернуться ко входу
        </ActionLink>
      </HStack>
    </AuthCard>
  );
}
