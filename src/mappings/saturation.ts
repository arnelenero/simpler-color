import Color from 'color'

import type { ColorMapping } from '../palette'

/**
 * Generates new color value by adjusting the base color's
 * saturation (the "S" value in HSL color)
 *
 * @param baseColor
 * @param key - percent saturation [0..100]
 * @returns new color value in hex
 * @throws if `baseColor` is not a valid color value
 */
const saturation: ColorMapping = (baseColor, key) => {
  if (typeof key !== 'number') return baseColor

  const targetS = Math.min(Math.max(key, 0), 100)

  return Color(baseColor).saturationl(targetS).hex()
}

export default saturation
