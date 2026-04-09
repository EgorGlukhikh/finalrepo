import { Badge, Grid, GridItem, Heading, HStack, Stack, Text } from '@chakra-ui/react';

import { ButtonLink, PageSection, SurfacePanel } from '@/components/compositions';

import { marketingSteps } from '../content';

type LandingHeroProps = {
  primaryCtaHref: string;
  primaryCtaLabel: string;
  secondaryCtaHref: string;
};

const keyPoints = [
  { label: 'Каталог', value: 'Бесплатные и платные программы в одном месте' },
  { label: 'Кабинет', value: 'Прогресс, доступ и быстрый возврат к урокам' },
  { label: 'Формат', value: 'Курс, модули и уроки в понятной структуре' },
];

export function LandingHero({ primaryCtaHref, primaryCtaLabel, secondaryCtaHref }: LandingHeroProps) {
  return (
    <PageSection>
      <Grid gap={{ base: 10, xl: 12 }} templateColumns={{ base: '1fr', xl: 'minmax(0,1.45fr) 20rem' }} alignItems="start">
        <GridItem>
          <Stack gap="10" maxW="5xl">
            <Stack gap="6" maxW="4xl">
              <Badge alignSelf="flex-start" variant="outline" borderColor="border.strong">
                Платформа обучения для риэлторов
              </Badge>

              <Stack gap="5">
                <Heading textStyle="display" maxW="4xl">
                  Онлайн-обучение для риэлторов без хаоса и перегруженных кабинетов.
                </Heading>
                <Text textStyle="body" color="fg.muted" maxW="2xl">
                  Выберите курс, проходите уроки в своем темпе и возвращайтесь к материалам с сохраненным прогрессом.
                </Text>
              </Stack>

              <HStack gap="3" flexWrap="wrap">
                <ButtonLink href={primaryCtaHref} colorPalette="brand">
                  {primaryCtaLabel}
                </ButtonLink>
                <ButtonLink href={secondaryCtaHref} variant="outline" borderColor="border.strong">
                  Открыть каталог
                </ButtonLink>
              </HStack>
            </Stack>

            <SurfacePanel tone="highlight" p={{ base: 6, md: 7 }}>
              <Grid gap="5" templateColumns={{ base: '1fr', lg: '1.2fr 0.8fr' }}>
                <GridItem>
                  <Stack gap="4" maxW="2xl">
                    <Text textStyle="overline" color="fg.subtle">
                      Что получает пользователь
                    </Text>
                    <Heading textStyle="sectionTitle" maxW="2xl">
                      Все, что нужно для обучения, собрано в одном месте.
                    </Heading>
                    <Text textStyle="bodyMuted" color="fg.muted" maxW="xl">
                      Каталог, курсы и прогресс всегда под рукой, поэтому можно сразу продолжать обучение.
                    </Text>
                  </Stack>
                </GridItem>

                <GridItem>
                  <Stack gap="0" borderTopWidth="1px" borderColor="border.subtle">
                    {keyPoints.map((item) => (
                      <Stack key={item.label} gap="2" py="4" borderBottomWidth="1px" borderColor="border.subtle">
                        <Text textStyle="overline" color="fg.subtle">
                          {item.label}
                        </Text>
                        <Text textStyle="bodyStrong" color="fg.default">
                          {item.value}
                        </Text>
                      </Stack>
                    ))}
                  </Stack>
                </GridItem>
              </Grid>
            </SurfacePanel>
          </Stack>
        </GridItem>

        <GridItem>
          <SurfacePanel tone="muted" p={{ base: 5, md: 6 }}>
            <Stack gap="5">
              <HStack justify="space-between">
                <Text textStyle="overline" color="fg.subtle">
                  Как начать
                </Text>
                <Badge variant="outline" borderColor="border.strong">
                  4 шага
                </Badge>
              </HStack>

              <Stack gap="4">
                {marketingSteps.map((item) => (
                  <Grid key={item.step} templateColumns="2rem minmax(0,1fr)" gap="3">
                    <Text textStyle="overline" color="fg.subtle">
                      {item.step}
                    </Text>
                    <Stack gap="1.5">
                      <Text textStyle="bodyStrong" color="fg.default">
                        {item.title}
                      </Text>
                      <Text textStyle="bodyMuted" color="fg.muted">
                        {item.description}
                      </Text>
                    </Stack>
                  </Grid>
                ))}
              </Stack>
            </Stack>
          </SurfacePanel>
        </GridItem>
      </Grid>
    </PageSection>
  );
}
