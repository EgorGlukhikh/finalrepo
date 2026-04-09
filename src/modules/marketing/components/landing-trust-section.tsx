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
              eyebrow="Что получает пользователь"
              title="После регистрации всё важное уже собрано в одном месте"
              description="Пользователь не прыгает между экранами в поиске доступа, уроков и прогресса. Каталог, кабинет и сам курс продолжают друг друга."
            />

            <Stack gap="0" borderTopWidth="1px" borderColor="border.subtle">
              {marketingTrustPoints.map((item, index) => (
                <Grid
                  key={item}
                  templateColumns={{ base: '1fr', md: '2.5rem minmax(0,1fr)' }}
                  gap="4"
                  py="4"
                  borderBottomWidth="1px"
                  borderColor="border.subtle"
                >
                  <Text textStyle="overline" color={index === 0 ? 'fg.brand' : 'fg.subtle'}>
                    0{index + 1}
                  </Text>
                  <Text textStyle={index === 0 ? 'body' : 'bodyMuted'} color={index === 0 ? 'fg.default' : 'fg.muted'} maxW="2xl">
                    {item}
                  </Text>
                </Grid>
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
