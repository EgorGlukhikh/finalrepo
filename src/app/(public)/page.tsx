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
          description="Спокойная точка входа в каталог курсов, личный кабинет и будущие рабочие разделы платформы."
        />
        <Card padding="lg">
          <Stack gap="md">
            <p className="max-w-prose text-sm leading-7 text-muted-foreground">
              В этой версии уже можно посмотреть каталог курсов, перейти на публичную страницу курса и открыть личный кабинет после входа.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <ActionLink href="/courses">Открыть каталог</ActionLink>
              <ActionLink href="/sign-in" variant="secondary">
                Войти в кабинет
              </ActionLink>
            </div>
          </Stack>
        </Card>
      </Stack>
    </Section>
  );
}
