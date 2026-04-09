import { Grid, GridItem, Heading, Stack, Text } from '@chakra-ui/react';

import { PageSection, SectionHeading, SurfacePanel } from '@/components/compositions';

import { marketingFaq, marketingTrustPoints } from '../content';

export function LandingTrustSection() {
  return (
    <PageSection tone="muted">
      <Grid gap="6" templateColumns={{ base: '1fr', xl: 'minmax(0,1fr) 24rem' }}>
        <GridItem>
          <Stack gap="8">
            <SectionHeading
              eyebrow="Доверие"
              title="Платформа говорит фактами, а не обещаниями"
              description="Здесь нет фальшивых цифр и искусственных отзывов. Только рабочая логика продукта и понятный путь для пользователя."
            />
            <Stack gap="4">
              {marketingTrustPoints.map((item, index) => (
                <SurfacePanel key={item} tone={index === 0 ? 'highlight' : 'muted'} p="5">
                  <Text textStyle="bodyMuted" color="fg.muted">
                    {item}
                  </Text>
                </SurfacePanel>
              ))}
            </Stack>
          </Stack>
        </GridItem>

        <GridItem>
          <SurfacePanel p="6" h="fit-content">
            <Stack gap="5">
              <Text textStyle="overline" color="fg.subtle">
                FAQ
              </Text>
              <Stack gap="4">
                {marketingFaq.map((item, index) => (
                  <Stack
                    key={item.question}
                    gap="2"
                    pt={index === 0 ? '0' : '4'}
                    borderTopWidth={index === 0 ? '0' : '1px'}
                    borderColor="border.subtle"
                  >
                    <Heading as="h3" fontSize="md" lineHeight="1.35" letterSpacing="-0.02em">
                      {item.question}
                    </Heading>
                    <Text textStyle="bodyMuted" color="fg.muted">
                      {item.answer}
                    </Text>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </SurfacePanel>
        </GridItem>
      </Grid>
    </PageSection>
  );
}
