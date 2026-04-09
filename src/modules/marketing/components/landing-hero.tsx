import { Badge, Grid, GridItem, Heading, HStack, Stack, Text } from '@chakra-ui/react';

import { BookOpenIcon, EyeIcon, IconChip } from '@/components/branding';
import { ButtonLink, PageSection, SurfacePanel } from '@/components/compositions';

import { marketingSteps } from '../content';

type LandingHeroProps = {
  primaryCtaHref: string;
  primaryCtaLabel: string;
  secondaryCtaHref: string;
};

export function LandingHero({ primaryCtaHref, primaryCtaLabel, secondaryCtaHref }: LandingHeroProps) {
  return (
    <PageSection>
      <Grid gap={{ base: 6, xl: 8 }} templateColumns={{ base: '1fr', xl: 'minmax(0,1.3fr) 22rem' }} alignItems="start">
        <GridItem>
          <Stack gap="8" maxW="5xl">
            <Stack gap="6">
              <Badge alignSelf="flex-start" colorPalette="brand" variant="subtle">
                Платформа обучения для риэлторов
              </Badge>

              <Stack gap="5">
                <Heading textStyle="display" fontSize={{ base: '4xl', lg: '5xl' }} maxW="4xl">
                  Курсы для риэлторов, которые помогают учиться спокойно и работать увереннее.
                </Heading>
                <Text textStyle="body" color="fg.muted" maxW="2xl">
                  Выберите программу, откройте бесплатный или платный курс, проходите уроки по шагам и возвращайтесь к
                  материалам с сохраненным прогрессом.
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

            <Grid gap="4" templateColumns={{ base: '1fr', lg: 'minmax(0,1.15fr) minmax(0,0.85fr)' }}>
              <SurfacePanel tone="highlight" minH={{ base: 'auto', lg: '20rem' }}>
                <Stack gap="5" h="full">
                  <HStack justify="space-between" align="start">
                    <IconChip icon={<BookOpenIcon size={18} />} tone="primary" />
                    <Badge variant="outline">Что есть внутри</Badge>
                  </HStack>

                  <Stack gap="4">
                    <Heading textStyle="sectionTitle" maxW="2xl">
                      Каталог курсов, личный кабинет, прогресс и доступ к материалам собраны в одной понятной системе.
                    </Heading>
                    <Text textStyle="bodyMuted" color="fg.muted" maxW="xl">
                      Пользователь видит, какие программы доступны, где он остановился и как вернуться к следующему
                      уроку без лишней навигации.
                    </Text>
                  </Stack>

                  <Grid mt="auto" gap="3" templateColumns={{ base: '1fr', sm: 'repeat(2, minmax(0, 1fr))' }}>
                    <SurfacePanel tone="inset" p="4" borderRadius="xl">
                      <Text textStyle="overline" color="fg.subtle">
                        Курсы
                      </Text>
                      <Text mt="2" textStyle="bodyMuted" color="fg.muted">
                        Бесплатные и платные программы с честным обозначением доступа и стоимости.
                      </Text>
                    </SurfacePanel>
                    <SurfacePanel tone="inset" p="4" borderRadius="xl">
                      <Text textStyle="overline" color="fg.subtle">
                        Прогресс
                      </Text>
                      <Text mt="2" textStyle="bodyMuted" color="fg.muted">
                        Личный кабинет помогает продолжать обучение с того места, где пользователь остановился.
                      </Text>
                    </SurfacePanel>
                  </Grid>
                </Stack>
              </SurfacePanel>

              <Stack gap="4">
                <SurfacePanel tone="muted" p="5">
                  <HStack align="start" gap="4">
                    <IconChip icon={<EyeIcon size={17} />} tone="muted" />
                    <Stack gap="2">
                      <Text textStyle="overline" color="fg.subtle">
                        Для кого
                      </Text>
                      <Text textStyle="bodyMuted" color="fg.muted">
                        Для риэлторов, которым нужны практические курсы, понятный доступ и спокойный учебный процесс без
                        перегруженного интерфейса.
                      </Text>
                    </Stack>
                  </HStack>
                </SurfacePanel>
              </Stack>
            </Grid>
          </Stack>
        </GridItem>

        <GridItem>
          <SurfacePanel minH="72">
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
                  <Grid key={item.step} templateColumns="2.5rem minmax(0,1fr)" gap="3.5">
                    <HStack
                      justify="center"
                      align="center"
                      h="10"
                      borderRadius="xl"
                      bg="bg.inset"
                      borderWidth="1px"
                      borderColor="border.subtle"
                      fontSize="sm"
                      fontWeight="700"
                    >
                      {item.step}
                    </HStack>
                    <Stack gap="1.5" pt="1">
                      <Text fontSize="sm" fontWeight="700" letterSpacing="-0.02em">
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
