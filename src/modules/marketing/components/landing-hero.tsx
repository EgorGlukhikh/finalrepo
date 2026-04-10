import { Badge, Grid, GridItem, Heading, HStack, SimpleGrid, Stack, Text } from '@chakra-ui/react';

import { ButtonLink, PageSection, SurfacePanel } from '@/components/compositions';

import { marketingSteps } from '../content';

type LandingHeroProps = {
  primaryCtaHref: string;
  primaryCtaLabel: string;
  secondaryCtaHref: string;
};

const keyPoints = [
  {
    label: 'Каталог',
    value: 'Все программы в одном месте: видно, что можно открыть сейчас, а что доступно после оплаты.',
  },
  {
    label: 'Кабинет',
    value: 'Курс, прогресс и следующий урок всегда под рукой, без лишних переходов и поиска.',
  },
  {
    label: 'Формат',
    value: 'Каждая программа разбита на модули и уроки, поэтому легко держать темп и не теряться.',
  },
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
                  Учитесь в спокойном ритме и сразу видите, куда двигаться дальше.
                </Heading>
                <Text textStyle="body" color="fg.muted" maxW="2xl">
                  Выбирайте курс, проходите уроки по шагам и возвращайтесь к материалам без поиска. Платформа помнит прогресс и не перегружает лишним.
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
              <Grid gap="6" templateColumns={{ base: '1fr', lg: '1.1fr 0.9fr' }}>
                <GridItem>
                  <Stack gap="4" maxW="2xl">
                    <Text textStyle="overline" color="fg.subtle">
                      Что здесь удобно
                    </Text>
                    <Heading textStyle="sectionTitle" maxW="2xl">
                      Курсы, кабинет и прогресс собраны так, чтобы можно было просто учиться, а не разбираться в интерфейсе.
                    </Heading>
                    <Text textStyle="bodyMuted" color="fg.muted" maxW="xl">
                      На первом экране видно, что открыть сейчас, где вы остановились и какой шаг идет следующим.
                    </Text>
                  </Stack>
                </GridItem>

                <GridItem>
                  <SimpleGrid columns={{ base: 1, md: 3, lg: 1 }} gap="3">
                    {keyPoints.map((item) => (
                      <SurfacePanel key={item.label} tone="muted" p="4">
                        <Stack gap="2">
                          <Text textStyle="overline" color="fg.subtle">
                            {item.label}
                          </Text>
                          <Text textStyle="bodyStrong" color="fg.default">
                            {item.value}
                          </Text>
                        </Stack>
                      </SurfacePanel>
                    ))}
                  </SimpleGrid>
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
                  <SurfacePanel key={item.step} tone="inset" p="4">
                    <Grid templateColumns="2.5rem minmax(0,1fr)" gap="3">
                      <Text textStyle="overline" color="fg.brand" pt="1">
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
                  </SurfacePanel>
                ))}
              </Stack>
            </Stack>
          </SurfacePanel>
        </GridItem>
      </Grid>
    </PageSection>
  );
}
