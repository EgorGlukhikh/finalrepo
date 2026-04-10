import { Box, Grid, GridItem, Heading, HStack, Stack, Text } from '@chakra-ui/react';

import { PageSection, SectionHeading } from '@/components/compositions';

import { marketingSteps } from '../content';

function progressWidth(index: number) {
  if (index === 0) return '32%';
  if (index === 1) return '68%';
  return '100%';
}

export function LandingBenefitsSection() {
  return (
    <PageSection tone="muted">
      <Grid gap={{ base: 10, xl: 16 }} templateColumns={{ base: '1fr', xl: 'minmax(0,0.78fr) minmax(0,1.22fr)' }} alignItems="start">
        <GridItem>
          <Stack gap="6" maxW="xl">
            <SectionHeading
              eyebrow="Путь обучения"
              title="Архитектура вашего пути"
              description="Последовательный процесс погружения в профессию. Вы видите направление, тему и следующий шаг без лишних экранов и шума."
            />
          </Stack>
        </GridItem>

        <GridItem>
          <Stack gap={{ base: 0, md: 1 }}>
            {marketingSteps.map((item, index) => (
              <Box key={item.step} borderTopWidth={index === 0 ? '1px' : '1px'} borderColor="border.subtle">
                <Grid
                  templateColumns={{ base: '4.5rem 1fr', md: '5.5rem minmax(0,1fr) 10rem' }}
                  gap={{ base: 4, md: 6 }}
                  py={{ base: 6, md: 8 }}
                  alignItems="center"
                >
                  <Text textStyle="overline" color="fg.brand" pt="1">
                    {item.step} / {index === 0 ? 'Курс' : index === 1 ? 'Модуль' : 'Урок'}
                  </Text>

                  <GridItem>
                    <Stack gap="2" maxW="2xl">
                      <Heading as="h3" textStyle="h4" color="fg.default">
                        {item.title}
                      </Heading>
                      <Text textStyle="bodyMuted" color="fg.muted" maxW="2xl">
                        {item.description}
                      </Text>
                    </Stack>
                  </GridItem>

                  <GridItem display={{ base: 'none', md: 'block' }}>
                    <Stack gap="2" align="end">
                      <HStack w="full" h="1px" bg="border.default" align="center">
                        <Box w={progressWidth(index)} h="1px" bg="accent.primary" />
                      </HStack>
                      <Text textStyle="caption" color="fg.subtle">
                        {index === 0 ? 'Старт' : index === 1 ? 'Структура' : 'Темп'}
                      </Text>
                    </Stack>
                  </GridItem>
                </Grid>
              </Box>
            ))}
          </Stack>
        </GridItem>
      </Grid>
    </PageSection>
  );
}
