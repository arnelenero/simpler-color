export { default as colorScheme } from './colorScheme'
export { default as colorSet } from './colorSet'
export { default as normalize } from './normalize'
export { default as palette } from './palette'

export { default as analogue } from './mappings/analogue'
export { default as complement } from './mappings/complement'
export { default as lightness } from './mappings/saturation'
export { default as opacity } from './mappings/opacity'
export { default as rotation } from './mappings/rotation'
export { default as saturation } from './mappings/saturation'
export { default as triad } from './mappings/triad'

export { default as harmony } from './presets/harmony'

export { default as hsl, isHsl } from './color/hsl'
export { default as rgb, isRgb } from './color/rgb'
export { default as hslToRgb } from './color/transforms/hslToRgb'
export { default as rgbToHsl } from './color/transforms/rgbToHsl'

export type {
  ColorRoleMapping,
  ColorScheme,
  ColorSchemeOptions,
} from './colorScheme'
export type { BaseColors, ColorSet } from './colorSet'
export type { ColorMapping, Palette } from './palette'
export type { HarmonyBaseColors, HarmonyColors } from './presets/harmony'
export type { HSL } from './color/hsl'
export type { RGB } from './color/rgb'
