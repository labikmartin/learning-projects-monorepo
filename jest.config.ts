import { getJestProjectsAsync } from '@nx/jest';

export default async () => ({
  clearMocks: true,
  projects: await getJestProjectsAsync(),
});
