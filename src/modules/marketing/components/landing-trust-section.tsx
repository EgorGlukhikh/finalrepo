import { Accordion, Grid, GridItem, Heading, HStack, Stack, Text } from '@chakra-ui/react';

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
              <Accordion.Root collapsible defaultValue={[marketingFaq[0]?.question ?? '']} variant="plain">
                <Stack gap="0">
                  {marketingFaq.map((item, index) => (
                    <Accordion.Item
                      key={item.question}
                      value={item.question}
                      borderTopWidth={index === 0 ? '0' : '1px'}
                      borderColor="border.subtle"
                    >
                      <Accordion.ItemTrigger py="4">
                        <HStack justify="space-between" gap="4" w="full" align="start">
                          <Heading as="h3" fontSize="md" lineHeight="1.35" letterSpacing="-0.02em" textAlign="left">
                            {item.question}
                          </Heading>
                          <Accordion.ItemIndicator color="fg.subtle" />
                        </HStack>
                      </Accordion.ItemTrigger>
                      <Accordion.ItemContent>
                        <Accordion.ItemBody px="0" pt="0" pb="4">
                          <Text textStyle="bodyMuted" color="fg.muted">
                            {item.answer}
                          </Text>
                        </Accordion.ItemBody>
                      </Accordion.ItemContent>
                    </Accordion.Item>
                  ))}
                </Stack>
              </Accordion.Root>
            </Stack>
          </SurfacePanel>
        </GridItem>
      </Grid>
    </PageSection>
  );
}
