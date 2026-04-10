import { Grid, GridItem, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react';

import { PageSection, SectionHeading, SurfacePanel } from '@/components/compositions';

import { marketingBenefits } from '../content';

export function LandingBenefitsSection() {
  return (
    <PageSection tone="muted">
      <Grid gap={{ base: 8, xl: 12 }} templateColumns={{ base: '1fr', xl: 'minmax(0,0.9fr) minmax(0,1.1fr)' }}>
        <GridItem>
          <SectionHeading
            eyebrow="Почему это удобно"
            title="Обучение устроено так, чтобы не терять темп и не тратить силы на лишние переходы."
            description="Каждый блок здесь работает на простую задачу: быстро открыть нужный курс, пройти следующий урок и без труда вернуться позже."
          />
        </GridItem>

        <GridItem>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
            {marketingBenefits.map((item, index) => (
              <SurfacePanel key={item.title} tone={index === 0 ? 'highlight' : 'muted'} h="full" p={{ base: 5, md: 6 }}>
                <Stack gap="3">
                  <Text textStyle="overline" color={index === 0 ? 'fg.brand' : 'fg.subtle'}>
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </Text>
                  <Heading as="h3" textStyle="h4" color="fg.default" maxW="18rem">
                    {item.title}
                  </Heading>
                  <Text textStyle="bodyMuted" color="fg.muted">
                    {item.description}
                  </Text>
                </Stack>
              </SurfacePanel>
            ))}
          </SimpleGrid>
        </GridItem>
      </Grid>
    </PageSection>
  );
}
