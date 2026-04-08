import { ActionLink } from '@/components/layout';
import { Card } from '@/components/ui';
import { Section, SectionHeader, Stack } from '@/components/layout';

export default function PublicHomePage() {
  return (
    <Section padding="lg">
      <Stack gap="lg" className="max-w-3xl">
        <SectionHeader
          eyebrow="Публичная зона"
          title="Академия риэлторов"
          description="Фундамент приложения готов. Дальше здесь появятся каталог, кабинет и админка."
        />
        <Card padding="lg">
          <Stack gap="md">
            <p className="max-w-prose text-sm text-muted-foreground">
              Это стартовый публичный слой платформы. Пока здесь только спокойный каркас и точки входа в систему.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <ActionLink href="/sign-in" variant="primary">
                Войти
              </ActionLink>
              <ActionLink href="/sign-up" variant="secondary">
                Создать аккаунт
              </ActionLink>
            </div>
          </Stack>
        </Card>
      </Stack>
    </Section>
  );
}
