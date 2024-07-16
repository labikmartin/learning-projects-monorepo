import { Grid, type GridProps } from '@chakra-ui/react';

import { ContentContainerGridColumn } from './types';

interface ContentContainer extends GridProps {
  children: React.ReactNode;
  gridColumn?: ContentContainerGridColumn;
}

export function ContentContainer({ children, ...rest }: ContentContainer) {
  return (
    <Grid
      {...rest}
      templateColumns="[full-width-start] 40px [breakout-start] 50px [page-content-start] 1fr [page-content-end] 50px [breakout-end] 40px [full-width-end]"
    >
      {children}
    </Grid>
  );
}
