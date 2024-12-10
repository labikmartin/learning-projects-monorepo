const nxPreset = require('@nx/jest/preset').default;

module.exports = {
  ...nxPreset,
  clearMocks: true,
  setupFilesAfterEnv: ['../../tests.setup.js'], // root of monorepo from app
};
