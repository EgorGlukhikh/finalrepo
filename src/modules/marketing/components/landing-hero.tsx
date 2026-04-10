import { Box, Grid, GridItem, Heading, HStack, Stack, Text } from '@chakra-ui/react';

import { ButtonLink, PageSection, SurfacePanel } from '@/components/compositions';

type LandingHeroProps = {
  primaryCtaHref: string;
  primaryCtaLabel: string;
  secondaryCtaHref: string;
};

const highlights = [
  {
    label: 'Видно, что открыто',
    text: 'Сразу понятно, что доступно сейчас.',
  },
  {
    label: 'Всегда на своем месте',
    text: 'Можно вернуться к уроку без поиска.',
  },
  {
    label: 'Знания для работы',
    text: 'Только то, что пригодится в сделках.',
  },
] as const;

const steps = [
  {
    step: '01',
    title: 'Выберите направление',
    description: 'Начните с программы под вашу задачу.',
  },
  {
    step: '02',
    title: 'Смотрите структуру курса',
    description: 'Модули и уроки собраны в понятный маршрут.',
  },
  {
    step: '03',
    title: 'Идите в своём темпе',
    description: 'Можно идти быстро или возвращаться позже.',
  },
];

export function LandingHero({ primaryCtaHref, primaryCtaLabel, secondaryCtaHref }: LandingHeroProps) {
  return (
    <PageSection>
      <Grid gap={{ base: 10, xl: 12 }} templateColumns={{ base: '1fr', xl: 'minmax(0,1.1fr) minmax(0,0.9fr)' }} alignItems="start">
        <GridItem>
          <Stack gap="8" maxW="4xl">
            <Stack gap="6" maxW="3xl">
              <Text textStyle="overline" color="fg.brand">
                Платформа обучения для риэлторов
              </Text>

              <Stack gap="5">
                <Heading textStyle="display" maxW="4xl">
                  Ваше мастерство
                </Heading>
                <Text textStyle="display" maxW="4xl" fontSize={{ base: '4xl', md: '5xl' }} lineHeight="1.05" color="fg.subtle">
                  в каждой сделке.
                </Text>
                <Text textStyle="body" color="fg.muted" maxW="2xl">
                  Курс, кабинет и прогресс собраны в одном месте. Открываете нужный шаг и продолжаете без лишних переходов.
                </Text>
              </Stack>

              <HStack gap="3" flexWrap="wrap">
                <ButtonLink href={primaryCtaHref} colorPalette="brand" variant="solid">
                  {primaryCtaLabel}
                </ButtonLink>
                <ButtonLink href={secondaryCtaHref} variant="outline" borderColor="border.strong">
                  Открыть каталог
                </ButtonLink>
              </HStack>
            </Stack>

            <SurfacePanel tone="highlight" p={{ base: 6, md: 7 }}>
              <Grid gap="6" templateColumns={{ base: '1fr', xl: 'minmax(0,0.95fr) minmax(0,1.05fr)' }} alignItems="start">
                <GridItem>
                  <Stack gap="4" maxW="2xl">
                    <Text textStyle="overline" color="fg.brand">
                      Что здесь удобно
                    </Text>
                    <Heading textStyle="sectionTitle" maxW="2xl">
                      Курсы, кабинет и прогресс собраны в один рабочий экран.
                    </Heading>
                    <Text textStyle="bodyMuted" color="fg.muted" maxW="xl">
                      На первом экране видно, что открыть сейчас и куда идти дальше.
                    </Text>
                  </Stack>
                </GridItem>

                <GridItem>
                  <Stack gap="3">
                    {highlights.map((item, index) => (
                      <SurfacePanel key={item.label} tone="inset" p="4">
                        <Stack gap="2">
                          <Text textStyle="overline" color="fg.subtle">
                            0{index + 1}
                          </Text>
                          <Text textStyle="bodyStrong" color="fg.default">
                            {item.label}
                          </Text>
                          <Text textStyle="bodyMuted" color="fg.muted">
                            {item.text}
                          </Text>
                        </Stack>
                      </SurfacePanel>
                    ))}
                  </Stack>
                </GridItem>
              </Grid>
            </SurfacePanel>
          </Stack>
        </GridItem>

        <GridItem>
          <Stack gap="6" align="stretch">
            <SurfacePanel tone="muted" p="5">
              <Stack gap="4">
                <HStack justify="space-between">
                  <Text textStyle="overline" color="fg.brand">
                    Как начать
                  </Text>
                  <Text textStyle="overline" color="fg.subtle">
                    4 шага
                  </Text>
                </HStack>

                <Stack gap="3">
                  {steps.map((item) => (
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

            <Box position="relative">
              <Box
                minH={{ base: '20rem', md: '28rem' }}
                borderRadius="md"
                borderWidth="1px"
                borderColor="border.subtle"
                bg="linear-gradient(145deg, rgba(12,17,28,1) 0%, rgba(18,24,38,1) 35%, rgba(15,21,34,1) 100%)"
                overflow="hidden"
                position="relative"
                boxShadow="lg"
              >
                <Box position="absolute" inset="0" bg="linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 30%, rgba(255,255,255,0.08) 68%, transparent 100%)" />
                <Box position="absolute" top="0" left="0" right="0" h="20" bg="rgba(255,255,255,0.03)" />
                <Box
                  position="absolute"
                  inset="0"
                  bgImage="linear-gradient(120deg, transparent 0%, transparent 40%, rgba(15, 194, 178, 0.08) 42%, rgba(15, 194, 178, 0.08) 44%, transparent 46%), radial-gradient(circle at 60% 40%, rgba(255,255,255,0.08) 0, transparent 35%), linear-gradient(155deg, rgba(255,255,255,0.06) 0 6%, transparent 6% 100%)"
                  opacity="0.95"
                />
              </Box>

              <Box
                position="absolute"
                left={{ base: '4', md: '-4' }}
                bottom={{ base: '4', md: '-5' }}
                w={{ base: '40', md: '48' }}
                p="6"
                bg="bg.surface"
                borderWidth="1px"
                borderColor="border.subtle"
                borderRadius="md"
                boxShadow="md"
              >
                <Text color="fg.brand" fontSize="3xl" fontWeight="700" letterSpacing="-0.04em" lineHeight="1">
                  12+
                </Text>
                <Text textStyle="overline" color="fg.subtle">
                  программ и маршрутов
                </Text>
              </Box>
            </Box>
          </Stack>
        </GridItem>
      </Grid>
    </PageSection>
  );
}
