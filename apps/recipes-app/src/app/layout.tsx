import { ColorModeScript } from '@chakra-ui/react';
import { MainNavigation } from '@libs/recipes-lib';

import { Providers } from './providers';
import { theme } from './theme';

import './global.css';

export const metadata = {
  description: 'Generated by create-nx-workspace',
  title: 'Welcome to recipes-app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Providers>
          <MainNavigation />
          {children}
        </Providers>
      </body>
    </html>
  );
}
