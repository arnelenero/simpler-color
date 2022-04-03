import { normalizeRgb, RGB } from '../rgb'

import type { HSL } from '../hsl'

/**
 * Converts from RGB to HSL color model
 *
 * This implementation is based on official algorithm:
 * https://drafts.csswg.org/css-color/#the-hsl-notation
 *
 * @param rgb - RGB color object
 * @returns the equivalent HSL color object
 */
export default function rgbToHsl(rgb: RGB): HSL {
  const { r, g, b, a } = normalizeRgb(rgb)

  const red = r / 255
  const green = g / 255
  const blue = b / 255

  const max = Math.max(red, green, blue)
  const min = Math.min(red, green, blue)
  const d = max - min
  const light = (min + max) / 2

  let hue = NaN // "powerless" h-value is represented here as NaN
  let sat = 0

  if (d !== 0) {
    // Improbable scenario from official algo removed:
    // (light === 0 || light === 1) is never true when d !== 0
    // and r,g,b values are properly clamped
    sat = (max - light) / Math.min(light, 1 - light)

    switch (max) {
      case red:
        hue = (green - blue) / d + (green < blue ? 6 : 0)
        break
      case green:
        hue = (blue - red) / d + 2
        break
      case blue:
        hue = (red - green) / d + 4
    }
    hue *= 60
  }

  return { h: hue, s: sat * 100, l: light * 100, a }
}
