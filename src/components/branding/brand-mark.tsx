import Link from 'next/link';
import { Box, HStack, Link as ChakraLink, Text, VStack } from '@chakra-ui/react';

type BrandMarkProps = {
  href?: string;
};

export function BrandMark({ href = '/' }: BrandMarkProps) {
  return (
    <ChakraLink asChild _hover={{ textDecoration: 'none' }} aria-label="Академия риэлторов">
      <Link href={href}>
        <HStack gap="3.5" align="center">
          <Box
            position="relative"
            boxSize="11"
            borderRadius="2xl"
            bg="bg.surface"
            borderWidth="1px"
            borderColor="border.subtle"
            boxShadow="sm"
            overflow="hidden"
          >
            <Box
              position="absolute"
              inset="2px"
              borderRadius="calc(var(--chakra-radii-2xl) - 2px)"
              bgGradient="linear(135deg, brand.100, rgba(255,255,255,0.88), bg.elevated)"
            />
            <Text
              position="relative"
              zIndex="1"
              h="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontFamily="heading"
              fontWeight="700"
              letterSpacing="-0.06em"
              color="fg.brand"
            >
              AR
            </Text>
          </Box>
          <VStack gap="0.5" align="start" lineHeight="1">
            <Text textStyle="overline" color="fg.subtle">
              Академия
            </Text>
            <Text fontSize="sm" fontWeight="700" letterSpacing="-0.02em" color="fg.default">
              риэлторов
            </Text>
          </VStack>
        </HStack>
      </Link>
    </ChakraLink>
  );
}
