import Color from 'color'

import normalize from '../normalize'

import type { ColorMapping } from '../palette'

/**
 * Generates new color value by adjusting the base color's
 * lightness (the "L" value in HSL color)
 *
 * @param baseColor
 * @param key - percent lightness [0..100]
 * @returns new color value in hex
 * @throws if `baseColor` is not a valid color value
 */
const lightness: ColorMapping = (baseColor, key) => {
  if (typeof key !== 'number') return baseColor

  const base = Color(baseColor)

  const targetL = Math.min(Math.max(key, 0), 100)

  return normalize(base.lightness(targetL))
}

export default lightness
