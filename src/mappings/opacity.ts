import Color from 'color'

import type { ColorMapping } from '../palette'

/**
 * Generates new color value by adjusting the base color's
 * opacity (the alpha or "A" value in RGBA color)
 *
 * @param baseColor
 * @param key - opacity value [0..1]
 * @returns new color value in rgba(...) format
 * @throws if `baseColor` is not a valid color value
 */
const opacity: ColorMapping = (baseColor, key) => {
  if (typeof key !== 'number') return baseColor

  const targetA = Math.min(Math.max(key, 0), 1)

  return Color(baseColor).alpha(targetA).toString()
}

export default opacity
