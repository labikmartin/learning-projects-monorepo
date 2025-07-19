const nxPreset = require('@nx/jest/preset').default;
const path = require('path');

module.exports = {
  ...nxPreset,
  clearMocks: true,
  setupFilesAfterEnv: [path.join(__dirname, 'tests.setup.js')],
};
