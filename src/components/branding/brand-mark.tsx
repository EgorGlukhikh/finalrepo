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
            boxSize="10"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="xl"
            borderWidth="1px"
            borderColor="border.subtle"
            bg="bg.elevated"
            color="fg.brand"
            fontFamily="heading"
            fontWeight="700"
            letterSpacing="-0.06em"
          >
            AR
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
