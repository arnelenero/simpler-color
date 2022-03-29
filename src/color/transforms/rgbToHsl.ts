import { clamp } from '../../utils'
import type { HSL } from '../hsl'
import type { RGB } from '../rgb'

/**
 * Converts from RGB to HSL color model
 *
 * @param rgb - RGB color object
 * @returns the equivalent HSL color object
 */
export default function rgbToHsl(rgb: RGB): HSL {
  // Normalize r,g,b values to range [0..1]
  const red = clamp(rgb.r / 255, 0, 1)
  const green = clamp(rgb.g / 255, 0, 1)
  const blue = clamp(rgb.b / 255, 0, 1)

  // Apply official algorithm from https://drafts.csswg.org/css-color/#the-hsl-notation
  const max = Math.max(red, green, blue)
  const min = Math.min(red, green, blue)
  const d = max - min
  const light = (min + max) / 2

  let hue = 0 // in official algo, default ("powerless") hue is NaN
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

  return { h: hue, s: sat * 100, l: light * 100, a: rgb.a }
}
