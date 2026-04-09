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
          title="Обучение устроено так, чтобы пользователь видел следующий шаг сразу"
          description="Каталог, личный кабинет, уроки и прогресс собраны в одной системе без лишнего интерфейсного шума."
        />

        <Grid gap="4" templateColumns={{ base: '1fr', xl: 'minmax(0,1.15fr) minmax(0,0.85fr)' }}>
          <GridItem>
            <SurfacePanel tone="highlight" minH={{ base: 'auto', xl: '18rem' }}>
              <Stack gap="4" maxW="2xl">
                <Stack direction="row" align="center" gap="3">
                  <IconChip icon={<BookIcon size={18} />} tone="primary" />
                  <Text textStyle="overline" color="fg.subtle">
                    Система
                  </Text>
                </Stack>

                <Heading textStyle="sectionTitle">
                  Интерфейс помогает открыть курс, дойти до урока и вернуться к обучению без лишних действий.
                </Heading>
                <Text textStyle="bodyMuted" color="fg.muted">
                  Пользователь сразу видит, что доступно, где он остановился и какой следующий шаг уже ждет его в
                  учебном маршруте.
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
