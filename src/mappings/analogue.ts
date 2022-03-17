import rotation from './rotation'

import type { ColorMapping } from '../palette'

/**
 * Generates a color that is analogous to the base color
 *
 * An analogous color is one that is located adjacent to
 * the base color around the color wheel, i.e. at around
 * 30˚ angle. It is visually similar to the base.
 *
 * This mapping function rotates the hue in steps of 30˚.
 * A negative `key` value rotates in the opposite
 * direction.
 *
 * @param baseColor
 * @param key - rotation steps
 * @returns new color value in hex
 * @throws if `baseColor` is not a valid color value
 */
const analogue: ColorMapping = (baseColor, key) => {
  if (typeof key !== 'number' || key === 0) return baseColor

  return rotation(baseColor, 30 * key)
}

export default analogue
