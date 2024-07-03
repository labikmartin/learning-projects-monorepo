import { baseColorTheme } from '../../constants';

export function getThemeColorTint(tint: number) {
  return `${baseColorTheme}.${tint}`;
}
