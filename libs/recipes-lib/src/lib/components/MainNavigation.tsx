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
  TabList,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Card, CardBody, Tab, Tabs } from '@chakra-ui/react';
import { ToggleColorModeButton } from '@libs/common/react-components';

import { Logo } from '../assets/';
import { navigationLinks } from '../constants';
import { baseColorTheme } from '../constants/theme';
import { getThemeColorTint } from '../helpers/theme/getThemeColorTint';

export function MainNavigation() {
  const pathname = usePathname();

  const navigationBackgroundColor = useColorModeValue(
    getThemeColorTint(50),
    undefined,
  );

  const activetabIndex = navigationLinks.findIndex(
    (link) => link.href === pathname,
  );

  return (
    <Flex justify="center" paddingY={3}>
      <Card
        size="sm"
        flexBasis="80%"
        position="sticky"
        backdropFilter="blur(10px)"
        backgroundColor={navigationBackgroundColor}
      >
        <CardBody>
          <Grid templateColumns="auto 1fr auto" alignItems="center">
            <GridItem>
              <NextLink href="/">
                <HStack spacing={3}>
                  <Image
                    as={NextImage}
                    src={Logo}
                    alt="Foodo Logo"
                    width={50}
                    height={50}
                    borderRadius={6}
                    priority
                    sizes="50px"
                  />
                  <Text fontSize="xl" fontWeight="bold">
                    Foodo
                  </Text>
                </HStack>
              </NextLink>
            </GridItem>
            <GridItem justifySelf="center">
              <Tabs
                variant="soft-rounded"
                colorScheme={baseColorTheme}
                as="nav"
                justifySelf="center"
                index={activetabIndex}
              >
                <TabList>
                  {navigationLinks.map((link) => (
                    <Tab
                      key={link.href}
                      as={NextLink}
                      href={link.href}
                      boxShadow="none !important"
                    >
                      {link.label}
                    </Tab>
                  ))}
                </TabList>
              </Tabs>
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
