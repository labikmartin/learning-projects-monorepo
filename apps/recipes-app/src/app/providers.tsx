'use client';

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';

import { theme } from './theme';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider>{children}</ChakraProvider>
    </>
  );
}
