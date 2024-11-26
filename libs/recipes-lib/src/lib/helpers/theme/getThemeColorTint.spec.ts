import { baseColorTheme } from '../../constants';

import { getThemeColorTint } from './getThemeColorTint';

describe('getThemeColorTint', () => {
  test('return the correct color tint', () => {
    expect(getThemeColorTint(50)).toBe(`${baseColorTheme}.50`);
  });
});
