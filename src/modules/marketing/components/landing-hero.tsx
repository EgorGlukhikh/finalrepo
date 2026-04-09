import { Badge, Grid, GridItem, Heading, HStack, Stack, Text } from '@chakra-ui/react';

import { BookOpenIcon, EyeIcon, IconChip, SearchIcon, SettingsIcon } from '@/components/branding';
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
      <Grid gap={{ base: 6, xl: 8 }} templateColumns={{ base: '1fr', xl: 'minmax(0,1.35fr) 24rem' }} alignItems="start">
        <GridItem>
          <Stack gap="8" maxW="5xl">
            <Stack gap="6">
              <Badge alignSelf="flex-start" borderRadius="full" px="3.5" py="1.5" colorPalette="brand" variant="subtle">
                Образовательная платформа для риэлторов
              </Badge>
              <Stack gap="5">
                <Heading
                  textStyle="display"
                  fontSize={{ base: '5xl', lg: '6xl' }}
                  maxW="5xl"
                >
                  Учебная среда, где курс, маршрут и доступ собраны в одном рабочем контуре.
                </Heading>
                <Text textStyle="body" fontSize={{ base: 'md', md: 'lg' }} color="fg.muted" maxW="2xl">
                  Академия риэлторов помогает выбрать программу, проходить уроки по шагам и возвращаться к материалам без
                  хаоса, перегруженных панелей и отрыва от реальной практики.
                </Text>
              </Stack>
              <HStack gap="3" flexWrap="wrap">
                <ButtonLink href={primaryCtaHref} colorPalette="brand" size="lg">
                  {primaryCtaLabel}
                </ButtonLink>
                <ButtonLink href={secondaryCtaHref} variant="outline" size="lg" borderColor="border.strong">
                  Посмотреть курсы
                </ButtonLink>
              </HStack>
            </Stack>

            <Grid gap="4" templateColumns={{ base: '1fr', lg: 'minmax(0,1.2fr) minmax(0,0.85fr)' }}>
              <SurfacePanel tone="highlight" minH={{ base: 'auto', lg: '22rem' }}>
                <Stack gap="6" h="full">
                  <HStack justify="space-between" align="start">
                    <IconChip icon={<BookOpenIcon size={18} />} tone="primary" />
                    <Badge colorPalette="gray" variant="subtle">
                      Что это
                    </Badge>
                  </HStack>

                  <Stack gap="4">
                    <Heading textStyle="sectionTitle" maxW="2xl">
                      Платформа, где обучение ощущается как рабочий процесс, а не как витрина из одинаковых карточек.
                    </Heading>
                    <Text textStyle="bodyMuted" color="fg.muted" maxW="xl">
                      Внутри уже работают каталог курсов, личный кабинет, обучение по модулям и урокам, прогресс, builder
                      и прозрачная логика бесплатного и платного доступа.
                    </Text>
                  </Stack>

                  <Grid mt="auto" gap="3" templateColumns={{ base: '1fr', sm: 'repeat(2, minmax(0, 1fr))' }}>
                    <SurfacePanel tone="inset" p="4" borderRadius="2xl">
                      <Text textStyle="overline" color="fg.subtle">
                        Каталог
                      </Text>
                      <Text mt="2" textStyle="bodyMuted" color="fg.muted">
                        Курсы с честной маркировкой: что открывается сразу, а что — после оплаты.
                      </Text>
                    </SurfacePanel>
                    <SurfacePanel tone="inset" p="4" borderRadius="2xl">
                      <Text textStyle="overline" color="fg.subtle">
                        Маршрут
                      </Text>
                      <Text mt="2" textStyle="bodyMuted" color="fg.muted">
                        Пользователь всегда видит, где он сейчас и что делать следующим шагом.
                      </Text>
                    </SurfacePanel>
                  </Grid>
                </Stack>
              </SurfacePanel>

              <Stack gap="4">
                <SurfacePanel minH="44" p="5">
                  <HStack align="start" gap="4">
                    <IconChip icon={<SearchIcon size={17} />} tone="muted" />
                    <Stack gap="2">
                      <Text textStyle="overline" color="fg.subtle">
                        Зачем
                      </Text>
                      <Text textStyle="bodyMuted" color="fg.muted">
                        Чтобы учиться по структурированной программе и не терять контекст между выбором курса, уроком и
                        практикой.
                      </Text>
                    </Stack>
                  </HStack>
                </SurfacePanel>
                <SurfacePanel tone="muted" minH="44" p="5">
                  <HStack align="start" gap="4">
                    <IconChip icon={<SettingsIcon size={17} />} tone="primary" />
                    <Stack gap="2">
                      <Text textStyle="overline" color="fg.subtle">
                        Как начать
                      </Text>
                      <Text textStyle="bodyMuted" color="fg.muted">
                        Зарегистрируйтесь, откройте каталог и начните с бесплатного курса или перейдите к платной программе.
                      </Text>
                    </Stack>
                  </HStack>
                </SurfacePanel>
              </Stack>
            </Grid>
          </Stack>
        </GridItem>

        <GridItem>
          <Stack gap="4">
            <SurfacePanel minH="72">
              <Stack gap="5">
                <HStack justify="space-between">
                  <Text textStyle="overline" color="fg.subtle">
                    Путь пользователя
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
                        borderRadius="2xl"
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

            <SurfacePanel tone="muted">
              <HStack align="start" gap="4">
                <IconChip icon={<EyeIcon size={17} />} tone="muted" />
                <Stack gap="2">
                  <Text textStyle="overline" color="fg.subtle">
                    Без шума
                  </Text>
                  <Text textStyle="bodyMuted" color="fg.muted">
                    Здесь нет фальшивых цифр, декоративной аналитики и пустых обещаний. Только рабочий маршрут обучения.
                  </Text>
                </Stack>
              </HStack>
            </SurfacePanel>
          </Stack>
        </GridItem>
      </Grid>
    </PageSection>
  );
}
