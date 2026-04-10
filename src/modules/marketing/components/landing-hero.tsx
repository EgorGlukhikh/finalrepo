import { Box, Container, Grid, Heading, Image, Text } from '@chakra-ui/react';

import { ButtonLink } from '@/components/compositions';

type LandingHeroProps = {
  primaryCtaHref: string;
  primaryCtaLabel: string;
  secondaryCtaHref: string;
};

const heroImageUrl =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBygQsXHo7mpd8zQm5CfRgieO61l8OgsKHJKGBYuIRG-xIRBZ8PeTacwDtqAI2_LuWKVsgL_oGZ25tJJvnzTgDCLbKKtgC_uxAITIu7aFe8UfHAYhq5qPvMt8bG7H6OVxQ8XDslritpKNH5u7n1raiMzuIPVCn90GKomXVJFM-mllxxY9_fAfmg-mh-6qAb4MQbxKCuIKXfNi2rNcAa1qaQJrSC3QcVAsZ6-XQpDFcowmC9i609fw7TtYN2L_g_8rI2e97vxcrFst6o';

export function LandingHero({ primaryCtaHref, primaryCtaLabel, secondaryCtaHref }: LandingHeroProps) {
  return (
    <Box as="section" px={{ base: '6', md: '12' }} py={{ base: 20, md: 32 }}>
      <Container maxW="wide" px="0">
        <Grid templateColumns={{ base: '1fr', lg: 'repeat(12, minmax(0, 1fr))' }} gap={{ base: 12, lg: 12 }} alignItems="center">
          <Box gridColumn={{ lg: 'span 7 / span 7' }}>
            <Text textStyle="overline" color="accent.primary" mb="6">
              Высшая школа недвижимости
            </Text>

            <Heading textStyle="display" color="fg.default" mb="8" maxW="4xl">
              Ваше мастерство
              <br />
              <Text as="span" color="fg.muted" fontStyle="italic" fontWeight="300">
                в каждой сделке.
              </Text>
            </Heading>

            <Text textStyle="body" color="fg.muted" maxW="2xl" mb="10">
              Переходите от теории к уверенным результатам. Практическое обучение для тех, кто строит карьеру в недвижимости
              на фундаменте экспертизы, а не случайности.
            </Text>

            <Box display="flex" flexDirection={{ base: 'column', sm: 'row' }} gap="6">
              <ButtonLink href={primaryCtaHref} variant="solid" size="lg">
                {primaryCtaLabel}
              </ButtonLink>
              <ButtonLink href={secondaryCtaHref} variant="outline" size="lg">
                Посмотреть программу
              </ButtonLink>
            </Box>
          </Box>

          <Box gridColumn={{ lg: 'span 5 / span 5' }} position="relative">
            <Box
              aspectRatio="4 / 5"
              bg="bg.inset"
              borderRadius="lg"
              overflow="hidden"
              borderWidth="1px"
              borderColor="rgba(59, 73, 76, 0.1)"
              position="relative"
            >
              <Image src={heroImageUrl} alt="Современный архитектурный интерьер" w="full" h="full" objectFit="cover" filter="grayscale(1)" opacity="0.6" />
              <Box position="absolute" inset="0" bgGradient="linear(to_t, bg.canvas, transparent, transparent)" />
            </Box>

            <Box
              position="absolute"
              left={{ base: '4', md: '-6' }}
              bottom={{ base: '4', md: '-6' }}
              bg="bg.elevated"
              px="8"
              py="7"
              borderWidth="1px"
              borderColor="rgba(59, 73, 76, 0.2)"
              maxW="200px"
              display={{ base: 'none', md: 'block' }}
            >
              <Text color="accent.primary" fontFamily="heading" fontSize="4xl" fontWeight="700" mb="2">
                12+
              </Text>
              <Text fontFamily="label" fontSize="10px" textTransform="uppercase" letterSpacing="0.16em" color="fg.muted">
                Программ сертификации
              </Text>
            </Box>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}
