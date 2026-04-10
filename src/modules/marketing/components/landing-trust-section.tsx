import Link from 'next/link';

import { Box, Container, Link as ChakraLink, Stack, Text } from '@chakra-ui/react';

import { ArrowRightSmallIcon, SupportIcon } from '@/components/branding';

export function LandingTrustSection() {
  return (
    <Box as="section" id="support" px={{ base: '6', md: '12' }} py={{ base: 20, md: 32 }} borderTopWidth="1px" borderColor="rgba(59, 73, 76, 0.1)">
      <Container maxW="wide" px="0">
        <Stack maxW="800px" mx="auto" align="center" textAlign="center">
          <Box color="accent.primary" mb="8">
            <SupportIcon size={46} />
          </Box>
          <Text as="h2" textStyle="pageTitle" fontSize={{ base: '3xl', md: '4xl' }} color="fg.default" mb="6">
            Мы здесь, чтобы поддержать вас
          </Text>
          <Text textStyle="body" color="fg.muted" maxW="2xl" mb="10">
            Если у вас возникли сложности с доступом или вы хотите подобрать индивидуальную программу обучения, наша команда
            готова помочь в любое время.
          </Text>
          <ChakraLink asChild color="accent.primary" _hover={{ textDecoration: 'none' }}>
            <Link href="/courses">
              <Box as="span" display="inline-flex" alignItems="center" gap="3" transition="gap 0.3s ease" _hover={{ gap: '5' }}>
                <Text fontFamily="label" fontSize="sm" fontWeight="700" letterSpacing="0.16em" textTransform="uppercase">
                  Связаться с поддержкой
                </Text>
                <ArrowRightSmallIcon size={16} />
              </Box>
            </Link>
          </ChakraLink>
        </Stack>
      </Container>
    </Box>
  );
}
