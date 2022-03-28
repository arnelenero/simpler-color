import type { HSL } from '../hsl'
import type { RGB } from '../rgb'

/**
 * Converts from RGB to HSL color model
 *
 * @param rgb - RGB color object
 * @returns the equivalent HSL color object
 */
export default function rgbToHsl(rgb: RGB): HSL {
  const r = rgb.r / 255
  const g = rgb.g / 255
  const b = rgb.b / 255
  const min = Math.min(r, g, b)
  const max = Math.max(r, g, b)
  const delta = max - min
  let h = 0
  let s

  if (max === min) {
    h = 0
  } else if (r === max) {
    h = (g - b) / delta
  } else if (g === max) {
    h = 2 + (b - r) / delta
  } else if (b === max) {
    h = 4 + (r - g) / delta
  }

  h = Math.min(h * 60, 360)

  if (h < 0) {
    h += 360
  }

  const l = (min + max) / 2

  if (max === min) {
    s = 0
  } else if (l <= 0.5) {
    s = delta / (max + min)
  } else {
    s = delta / (2 - max - min)
  }

  return { h, s: s * 100, l: l * 100, a: rgb.a }
}
