import { Box, Container, Grid, Heading, HStack, Stack, Text } from '@chakra-ui/react';

import { marketingSteps } from '../content';

function progressWidth(index: number) {
  if (index === 0) return '33%';
  if (index === 1) return '66%';
  return '100%';
}

export function LandingJourneySection() {
  return (
    <Box as="section" id="about" px={{ base: '6', md: '12' }} py={{ base: 20, md: 32 }}>
      <Container maxW="wide" px="0">
        <Box mb={{ base: 12, md: 24 }}>
          <Heading textStyle="sectionTitle" color="fg.default" mb="6">
            Архитектура вашего пути
          </Heading>
          <Text textStyle="body" color="fg.muted">
            Последовательный процесс погружения в профессию.
          </Text>
        </Box>

        <Stack gap="12">
          {marketingSteps.map((item, index) => (
            <Box
              key={item.step}
              pb="12"
              borderBottomWidth={index === marketingSteps.length - 1 ? '0' : '1px'}
              borderColor="rgba(59, 73, 76, 0.1)"
            >
              <Grid templateColumns={{ base: '1fr', md: '6rem minmax(0, 1fr) 8rem' }} gap="8" alignItems="start">
                <Text fontFamily="label" fontSize="xs" letterSpacing="0.16em" textTransform="uppercase" color="accent.primary" opacity="0.72" pt={{ md: '2' }}>
                  {item.step} / {index === 0 ? 'Курс' : index === 1 ? 'Модуль' : 'Урок'}
                </Text>

                <Box>
                  <Heading as="h3" textStyle="h4" color="fg.default" mb="4">
                    {item.title}
                  </Heading>
                  <Text textStyle="bodyMuted" color="fg.muted" maxW="2xl">
                    {item.description}
                  </Text>
                </Box>

                <HStack
                  display={{ base: 'none', md: 'flex' }}
                  w="32"
                  h="1"
                  bg="bg.elevated"
                  borderRadius="full"
                  overflow="hidden"
                  alignSelf="center"
                >
                  <Box w={progressWidth(index)} h="full" bg="accent.primary" />
                </HStack>
              </Grid>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
