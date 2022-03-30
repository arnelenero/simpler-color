import { normalizeAngle } from '../angle'

import type { HSL } from '../hsl'
import type { RGB } from '../rgb'

/**
 * Converts from HSL to RGB color model
 *
 * @param hsl - HSL color object
 * @returns the equivalent RGB color object
 */
export default function hslToRgb(hsl: HSL): RGB {
  // If hue is NaN (i.e. color is grayscale), assign arbitrary value of 0
  const h = hsl.h || 0

  // Apply official algorithm from https://drafts.csswg.org/css-color/#the-hsl-notation
  const hue = normalizeAngle(h)
  const sat = hsl.s / 100
  const light = hsl.l / 100

  function f(n: number) {
    const k = (n + hue / 30) % 12
    const a = sat * Math.min(light, 1 - light)
    return light - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))
  }

  return { r: f(0) * 255, g: f(8) * 255, b: f(4) * 255, a: hsl.a }
}
