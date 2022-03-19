import rotation from '../mappings/rotation'
import saturation from '../mappings/saturation'
import normalize from '../normalize'

import type { ColorSet } from '../colorSet'
import type { StringOrNumber } from '../utils'

/**
 * Generates a set of base colors that goes well with
 * the given primary base color
 *
 * @param baseColor
 * @returns a keyed list of base colors
 */
export default function harmony(baseColor: string) {
  return {
    primary: normalize(baseColor),
    secondary: saturation(rotation(baseColor, 30), 15),
    accent: saturation(rotation(baseColor, 90), 80),
    neutral: saturation(baseColor, 5),
    error: '#BB2211',
  }
}

type HarmonyBaseColors = ReturnType<typeof harmony>

type HarmonyColorClass = keyof HarmonyBaseColors

type HarmonyColorKey =
  | 0
  | 10
  | 20
  | 30
  | 40
  | 50
  | 60
  | 70
  | 80
  | 90
  | 95
  | 98
  | 100

/** Color set built with Harmony base colors */
export type HarmonyColors<K extends StringOrNumber = HarmonyColorKey> =
  ColorSet<HarmonyColorClass, K>
