import rotation from '../mappings/rotation'
import saturation from '../mappings/saturation'

import type { BaseColors } from '../colorSet'

/**
 * Generates a set of base colors that goes well with
 * the given primary base color
 *
 * @param baseColor
 * @returns a keyed list of base colors
 */
export default function harmony(baseColor: string): BaseColors {
  return {
    primary: baseColor,
    secondary: saturation(rotation(baseColor, 30), 15),
    accent: saturation(rotation(baseColor, 90), 80),
    neutral: saturation(baseColor, 5),
    error: '#BB2211',
  }
}
