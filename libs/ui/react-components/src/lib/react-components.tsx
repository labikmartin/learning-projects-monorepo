'use client';

import { ToggleColorModeButton } from '../';

import styles from './react-components.module.scss';

/* eslint-disable-next-line */
export interface ReactComponentsProps {}

export function ReactComponents(props: ReactComponentsProps) {
  return (
    <div className={styles['container']}>
      <ToggleColorModeButton />
      <h1>Welcome to ReactComponents!</h1>
    </div>
  );
}
