import NextLink from 'next/link';
import { Tab, TabList, Tabs } from '@chakra-ui/react';

import { baseColorTheme } from '../../constants/theme';

import { type NavigationTabLink } from './types';

export interface NavigationTabsProps {
  activeTabIndex: number;
  navigationLinks: NavigationTabLink[];
}

export function NavigationTabs({
  activeTabIndex,
  navigationLinks,
}: NavigationTabsProps) {
  return (
    <Tabs
      as="nav"
      colorScheme={baseColorTheme}
      index={activeTabIndex}
      justifySelf="center"
      variant="soft-rounded"
    >
      <TabList>
        {navigationLinks.map((link) => (
          <Tab
            as={NextLink}
            boxShadow="none !important"
            href={link.href}
            key={link.href}
          >
            {link.label}
          </Tab>
        ))}
      </TabList>
    </Tabs>
  );
}
