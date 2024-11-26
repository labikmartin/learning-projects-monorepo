import { GridItem, type GridItemProps } from '@chakra-ui/react';

import { type ContentContainerGridColumn } from './types';

interface ContentContainerItemProps extends GridItemProps {
  children?: React.ReactNode;
  gridColumn?: ContentContainerGridColumn;
}

export function ContentContainerItem({
  children,
  gridColumn,
  ...rest
}: ContentContainerItemProps) {
  return (
    <GridItem {...rest} gridColumn={gridColumn}>
      {children}
    </GridItem>
  );
}
