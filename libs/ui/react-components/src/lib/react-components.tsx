'use client';

import { useEffect } from 'react';
import styles from './react-components.module.scss';

/* eslint-disable-next-line */
export interface ReactComponentsProps {}

export function ReactComponents(props: ReactComponentsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ReactComponents!</h1>
    </div>
  );
}
