import { getJestProjectsAsync } from '@nx/jest';

export default async () => ({
  clearMocks: true,
  projects: await getJestProjectsAsync(),
  setupFilesAfterEnv: ['<rootDir>/tests.setup.js'],
});
