import colorString from '../color/colorString'
import hsl from '../color/hsl'

import type { ColorMapping } from '../palette'

/**
 * Rotates the hue of the base color by a specified angle
 * around the color wheel
 *
 * A negative `key` value reverses the direction of rotation.
 *
 * @param baseColor
 * @param key - rotation angle in degrees
 * @returns new color value in hex
 * @throws if `baseColor` is not a valid color value
 */
const rotation: ColorMapping = (baseColor, key) => {
  if (typeof key !== 'number' || key === 0) return baseColor

  const base = hsl(baseColor)

  const targetH = (base.h + key) % 360

  return colorString({ ...base, h: targetH })
}

export default rotation
