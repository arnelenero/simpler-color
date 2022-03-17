import rotation from './rotation'

import type { ColorMapping } from '../palette'

/**
 * Generates a triadic complementary color to the base color
 *
 * A triadic palette consists of 3 colors that are equally
 * spaced around the color wheel. Therefore, producing a
 * triadic complementary color means rotating the hue by
 * 120˚ angle. This provides a more subtle contrast.
 *
 * This mapping function is cyclic. A negative key value
 * rotates in the opposite direction.
 *
 * @param baseColor
 * @param key - rotation steps
 * @returns new color value in hex
 */
const triad: ColorMapping = (baseColor, key) => {
  if (typeof key !== 'number' || key === 0) return baseColor

  return rotation(baseColor, 120 * key)
}

export default triad
