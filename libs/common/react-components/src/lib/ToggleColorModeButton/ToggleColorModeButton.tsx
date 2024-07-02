'use client';

import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Button, useColorMode } from '@chakra-ui/react';
import { chakraColorModes } from '@libs/common/constants';

export function ToggleColorModeButton() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button onClick={toggleColorMode}>
      {colorMode === chakraColorModes.light ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
}
