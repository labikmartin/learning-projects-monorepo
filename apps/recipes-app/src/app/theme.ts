import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import { chakraColorModes } from '@libs/common/constants';

const config: ThemeConfig = {
  initialColorMode: chakraColorModes.light,
  useSystemColorMode: true,
};

export const theme = extendTheme({ config });
