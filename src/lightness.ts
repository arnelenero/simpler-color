import Color from 'color'

import type { ColorMapping } from './palette'

/**
 * Generates new color value by adjusting the base color's
 * lightness (the "L" value in HSL color)
 *
 * @param baseColor
 * @param key - specifies the percent lightness [0..100]
 * @returns new color value
 * @throws if `baseColor` is not a valid color value
 */
const lightness: ColorMapping = (baseColor, key) => {
  if (typeof key !== 'number') return baseColor

  const percent = Math.min(Math.max(key, 0), 100)

  return Color(baseColor).lightness(percent).toString()
}

export default lightness
