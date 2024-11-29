import type { RootState } from '@app/store.ts';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { launchApi } from '../launch.service';

export type Launch = Record<string, unknown>;
export type Launches = Launch[];

interface LaunchState {
  launches: Launches | null;
  selectedLaunch: Launch | null;
}

const initialState: LaunchState = {
  selectedLaunch: null,
  launches: null,
};

export const launchSlice = createSlice({
  name: 'launch',
  initialState,
  reducers: {
    setLaunches: (state, action: PayloadAction<Launches>) => {
      state.launches = action.payload;
    },
    setLaunch: (state, action: PayloadAction<Launch>) => {
      state.selectedLaunch = action.payload;
    },
  },
});

export const { setLaunch, setLaunches } = launchSlice.actions;

export const selectLaunch = (state: RootState) => state.launch.selectedLaunch;
export const selectLaunches = (state: RootState) =>
  launchApi.endpoints.getLaunches.select()(state).data;

export default launchSlice.reducer;
