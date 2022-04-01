import colorString from '../color/colorString'
import rgb from '../color/rgb'

import type { ColorMapping } from '../palette'

/**
 * Generates new color value by adjusting the base color's
 * opacity (the alpha or "A" value in RGBA)
 *
 * @param baseColor
 * @param key - opacity value [0..1]
 * @returns new color value in `rgba(...)` format
 * @throws if `baseColor` is not a valid color value
 */
const opacity: ColorMapping = (baseColor, key) => {
  if (typeof key !== 'number') return baseColor

  const base = rgb(baseColor)

  const targetA = Math.min(Math.max(key, 0), 1)

  return colorString({ ...base, a: targetA })
}

export default opacity
