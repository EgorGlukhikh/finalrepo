import { Grid, GridItem, Heading, Stack, Text } from '@chakra-ui/react';

import { BookIcon, IconChip } from '@/components/branding';
import { PageSection, SectionHeading, SurfacePanel } from '@/components/compositions';

import { marketingBenefits } from '../content';

export function LandingBenefitsSection() {
  const [firstBenefit, ...otherBenefits] = marketingBenefits;

  return (
    <PageSection tone="muted">
      <Stack gap="8">
        <SectionHeading
          eyebrow="Преимущества"
          title="Четыре опоры, на которых держится спокойный интерфейс обучения"
          description="Без перегруженных панелей, без ложного премиума и без ощущения, что продукт требует лишних действий от пользователя."
        />

        <Grid gap="4" templateColumns={{ base: '1fr', xl: 'minmax(0,1.15fr) minmax(0,0.85fr)' }}>
          <GridItem>
            <SurfacePanel tone="highlight" minH={{ base: 'auto', xl: '20rem' }}>
              <Stack gap="4" maxW="2xl">
                <HStackWrapper />
                <Heading textStyle="sectionTitle">
                  Интерфейс помогает двигаться по курсу, а не отвлекает второстепенными сущностями.
                </Heading>
                <Text textStyle="bodyMuted" color="fg.muted">
                  Мы собрали каталог, личный кабинет, уроки, прогресс и доступ так, чтобы каждый следующий шаг читался
                  сразу: выбрать курс, открыть урок, продолжить обучение, вернуться позже.
                </Text>
              </Stack>
            </SurfacePanel>
          </GridItem>

          <GridItem>
            <Grid gap="4" templateColumns={{ base: '1fr', sm: 'repeat(2, minmax(0,1fr))' }}>
              {firstBenefit ? (
                <GridItem colSpan={{ base: 1, sm: 2 }}>
                  <SurfacePanel p="5">
                    <Stack gap="3">
                      <Text textStyle="overline" color="fg.subtle">
                        {firstBenefit.title}
                      </Text>
                      <Text textStyle="bodyMuted" color="fg.muted">
                        {firstBenefit.description}
                      </Text>
                    </Stack>
                  </SurfacePanel>
                </GridItem>
              ) : null}
              {otherBenefits.map((item) => (
                <GridItem key={item.title}>
                  <SurfacePanel tone="muted" p="5" minH="full">
                    <Stack gap="3">
                      <Text fontSize="sm" fontWeight="700" letterSpacing="-0.02em">
                        {item.title}
                      </Text>
                      <Text textStyle="bodyMuted" color="fg.muted">
                        {item.description}
                      </Text>
                    </Stack>
                  </SurfacePanel>
                </GridItem>
              ))}
            </Grid>
          </GridItem>
        </Grid>
      </Stack>
    </PageSection>
  );
}

function HStackWrapper() {
  return (
    <Stack direction="row" align="center" gap="3">
      <IconChip icon={<BookIcon size={18} />} tone="primary" />
      <Text textStyle="overline" color="fg.subtle">
        Система
      </Text>
    </Stack>
  );
}
