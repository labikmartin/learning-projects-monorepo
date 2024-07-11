'use client';

import NextImage from 'next/image';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Card, CardBody } from '@chakra-ui/react';
import { ToggleColorModeButton } from '@libs/common/react-components';

import { Logo } from '../../assets';
import { navigationLinks } from '../../constants';
import { getThemeColorTint } from '../../helpers/theme/getThemeColorTint';
import { NavigationTabs } from '..';

export function MainNavigation() {
  const pathname = usePathname();

  const navigationBackgroundColor = useColorModeValue(
    getThemeColorTint(50),
    undefined,
  );

  const activeTabIndex = navigationLinks.findIndex((link) =>
    pathname.includes(link.href),
  );

  return (
    <Flex justify="center" paddingY={3}>
      <Card
        backdropFilter="blur(10px)"
        backgroundColor={navigationBackgroundColor}
        flexBasis="80%"
        position="sticky"
        size="sm"
      >
        <CardBody>
          <Grid alignItems="center" templateColumns="auto 1fr auto">
            <GridItem>
              <NextLink href="/">
                <HStack spacing={3}>
                  <Image
                    priority
                    alt="Foodo Logo"
                    as={NextImage}
                    borderRadius={6}
                    height={50}
                    sizes="50px"
                    src={Logo}
                    width={50}
                  />
                  <Text fontSize="xl" fontWeight="bold">
                    Foodo
                  </Text>
                </HStack>
              </NextLink>
            </GridItem>
            <GridItem justifySelf="center">
              <NavigationTabs
                activeTabIndex={activeTabIndex}
                navigationLinks={navigationLinks}
              />
            </GridItem>
            <GridItem>
              <ToggleColorModeButton />
            </GridItem>
          </Grid>
        </CardBody>
      </Card>
    </Flex>
  );
}
