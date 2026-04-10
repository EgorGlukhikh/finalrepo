import { Box, Container, Grid, Heading, Stack, Text } from '@chakra-ui/react';

import { EyeIcon, HandshakeIcon, RestoreIcon } from '@/components/branding';

import { marketingBenefits } from '../content';

const icons = [EyeIcon, RestoreIcon, HandshakeIcon] as const;

export function LandingBenefitsSection() {
  return (
    <Box as="section" bg="bg.surfaceMuted" py={{ base: 20, md: 32 }}>
      <Container maxW="wide" px={{ base: '6', md: '12' }}>
        <Grid
          gridTemplateColumns={{ base: '1fr', md: 'repeat(3, minmax(0, 1fr))' }}
          gap="1px"
          bg="rgba(59, 73, 76, 0.1)"
          borderTopWidth="1px"
          borderBottomWidth="1px"
          borderColor="rgba(59, 73, 76, 0.1)"
        >
          {marketingBenefits.map((item, index) => {
            const Icon = icons[index] ?? EyeIcon;

            return (
              <Box
                key={item.title}
                bg="bg.surfaceMuted"
                px={{ base: 8, md: 12 }}
                py={{ base: 10, md: 12 }}
                transition="background-color 0.3s ease"
                _hover={{ bg: 'bg.surface' }}
                role="group"
              >
                <Icon size={30} color="var(--chakra-colors-accent-primary)" />
                <Stack gap="4" mt="8">
                  <Heading as="h3" textStyle="h4" color="fg.default" transition="transform 0.3s ease" _groupHover={{ transform: 'translateX(8px)' }}>
                    {item.title}
                  </Heading>
                  <Text textStyle="bodyMuted" color="fg.muted" maxW="md">
                    {item.description}
                  </Text>
                </Stack>
              </Box>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
