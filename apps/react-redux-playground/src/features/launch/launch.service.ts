// Or from '@reduxjs/toolkit/query/react'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { Launches } from './store/launch.slice';

export const launchApi = createApi({
  reducerPath: 'launchApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.spacexdata.com/v3',
  }),
  tagTypes: ['Launches'],
  endpoints: (build) => ({
    getLaunches: build.query<Launches, void>({
      query: () => ({ url: 'launches', params: { limit: 10 } }),
    }),
  }),
});

export const { useGetLaunchesQuery } = launchApi;
