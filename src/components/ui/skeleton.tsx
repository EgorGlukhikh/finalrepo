import { Box, type BoxProps } from '@chakra-ui/react';

export function Skeleton({ className, ...props }: BoxProps) {
  return <Box className={className} animation="pulse" borderRadius="md" bg="bg.surfaceMuted" {...props} />;
}
