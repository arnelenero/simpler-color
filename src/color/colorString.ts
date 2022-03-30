import { isHsl } from './hsl'
import { normalizeRgb } from './rgb'
import hslToRgb from './transforms/hslToRgb'

import type { HSL } from './hsl'
import type { RGB } from './rgb'

function rgbToHexString(rgb: RGB): string {
  const int =
    ((Math.round(rgb.r) & 0xff) << 16) +
    ((Math.round(rgb.g) & 0xff) << 8) +
    (Math.round(rgb.b) & 0xff)

  const str = int.toString(16).toUpperCase()
  const padLeft = '000000'.substring(str.length)
  return `#${padLeft}${str}`
}

function rgbToRgbaString(rgb: RGB): string {
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`
}

/**
 * Builds a color string from a color model object
 *
 * For maximum CSS compatibility, the output is in `#rrggbb`
 * hex format when opacity (alpha) is 1, while in `rgba()`
 * otherwise.
 *
 * @param color - either RGB or HSL color object
 * @returns a CSS color string
 */
export default function colorString(color: RGB | HSL): string {
  const rgbColor = isHsl(color) ? hslToRgb(color) : normalizeRgb(color)
  return rgbColor.a === 1 ? rgbToHexString(rgbColor) : rgbToRgbaString(rgbColor)
}
