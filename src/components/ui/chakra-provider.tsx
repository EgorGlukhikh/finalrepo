'use client';

import type { ReactNode } from 'react';

import { ChakraProvider } from '@chakra-ui/react';

import { system } from '@/theme/system';

type ChakraAppProviderProps = {
  children: ReactNode;
};

export function ChakraAppProvider({ children }: ChakraAppProviderProps) {
  return <ChakraProvider value={system}>{children}</ChakraProvider>;
}
