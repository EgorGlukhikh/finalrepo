import { Grid, GridItem, Stack, Text } from '@chakra-ui/react';

import { PageSection, SectionHeading } from '@/components/compositions';

import { marketingBenefits } from '../content';

export function LandingBenefitsSection() {
  return (
    <PageSection tone="muted">
      <Grid gap={{ base: 8, xl: 12 }} templateColumns={{ base: '1fr', xl: 'minmax(0,0.9fr) minmax(0,1.1fr)' }}>
        <GridItem>
          <SectionHeading
            eyebrow="Преимущества"
            title="Обучение, к которому легко возвращаться"
            description="Курсы собраны так, чтобы не терять прогресс и не тратить время на поиск нужного урока."
          />
        </GridItem>

        <GridItem>
          <Stack gap="0" borderTopWidth="1px" borderColor="border.subtle">
            {marketingBenefits.map((item, index) => (
              <Grid
                key={item.title}
                templateColumns={{ base: '1fr', md: '10rem minmax(0,1fr)' }}
                gap="5"
                py="5"
                borderBottomWidth="1px"
                borderColor="border.subtle"
              >
                <Text textStyle="overline" color={index === 0 ? 'fg.brand' : 'fg.subtle'}>
                  {item.title}
                </Text>
                <Text textStyle="body" color={index === 0 ? 'fg.default' : 'fg.muted'} maxW="2xl">
                  {item.description}
                </Text>
              </Grid>
            ))}
          </Stack>
        </GridItem>
      </Grid>
    </PageSection>
  );
}
