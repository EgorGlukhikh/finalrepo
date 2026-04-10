import { Accordion, Grid, GridItem, Heading, HStack, Stack, Text } from '@chakra-ui/react';

import { PageSection, SectionHeading, SurfacePanel } from '@/components/compositions';

import { marketingFaq, marketingTrustPoints } from '../content';

export function LandingTrustSection() {
  return (
    <PageSection tone="muted">
      <Grid gap={{ base: 8, xl: 12 }} templateColumns={{ base: '1fr', xl: 'minmax(0,1fr) 24rem' }}>
        <GridItem>
          <Stack gap="8">
            <SectionHeading
              eyebrow="После регистрации"
              title="Что будет после входа"
              description="Каталог, курсы и прогресс уже на месте."
            />

            <Stack gap="0" borderTopWidth="1px" borderColor="border.subtle">
              {marketingTrustPoints.map((item, index) => (
                <Stack
                  key={item}
                  gap="3"
                  py={{ base: 5, md: 6 }}
                  borderBottomWidth="1px"
                  borderColor="border.subtle"
                  align="start"
                >
                  <Text textStyle="overline" color={index === 0 ? 'fg.brand' : 'fg.subtle'}>
                    0{index + 1}
                  </Text>
                  <Text textStyle={index === 0 ? 'body' : 'bodyMuted'} color={index === 0 ? 'fg.default' : 'fg.muted'} maxW="xl">
                    {item}
                  </Text>
                </Stack>
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
                          <Heading as="h3" fontSize="md" lineHeight="1.4" letterSpacing="-0.02em" textAlign="left">
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
