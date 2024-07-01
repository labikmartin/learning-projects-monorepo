'use client';

import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Button, type ColorMode, useColorMode } from '@chakra-ui/react';

type ColorModeVariants = {
  [K in ColorMode]: K;
};

const colorModeVariants: ColorModeVariants = {
  light: 'light',
  dark: 'dark',
};

export function ToggleColorModeButton() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button onClick={toggleColorMode}>
      {colorMode === colorModeVariants.light ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
}
