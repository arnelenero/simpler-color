import rotation from './rotation'

import type { ColorMapping } from '../palette'

/**
 * Generates a color that is complementary to the base color
 *
 * A complementary color is one that is located at the
 * opposite side of the color wheel, i.e. at 180˚ angle.
 * This provides excellent color contrast.
 *
 * This mapping function cycles through multiple sets of
 * "double complementary" hue rotation. The algorithm loops
 * from 1 to `key`, rotates Hue by 180˚ on every odd
 * iteration, and 30˚ on even. A negative `key` value
 * rotates in the opposite direction.
 *
 * @param baseColor
 * @param key - rotation steps
 * @returns new color value in hex
 * @throws if `baseColor` is not a valid color value
 */
const complement: ColorMapping = (baseColor, key) => {
  if (typeof key !== 'number' || key === 0) return baseColor

  let angle = 0
  let direction = key < 0 ? -1 : 1
  let i = 0
  while (i !== key) {
    i += direction

    if (i % 2 !== 0) angle += 180 * direction
    else angle += 30 * direction
  }

  return rotation(baseColor, angle)
}

export default complement
