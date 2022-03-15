import palette from './palette'

import type { ColorMapping, Palette } from './palette'
import type { StringOrNumber } from './utils'

/** Base colors for palettes */
export type BaseColors<P extends string = string> = Record<P, string>

/** Keyed list of color palettes */
export type ColorSet<
  P extends string = string,
  K extends StringOrNumber = StringOrNumber,
> = Record<P, Palette<K>>

/**
 * Creates color palettes from their corresponding base
 * colors
 *
 * @param baseColors - keyed list of base colors
 * @param colorMapping - function for generating the colors
 * @param noCache - option to disable caching of color mapping
 * @returns a keyed list of palettes
 */
export default function colorSet<P extends string, K extends StringOrNumber>(
  baseColors: BaseColors<P>,
  colorMapping?: ColorMapping<K>,
  noCache?: boolean,
): ColorSet<P, K> {
  const colorClasses = Object.keys(baseColors) as P[]

  return colorClasses.reduce<Partial<ColorSet<P, K>>>(
    (palettes, colorClass) => {
      return {
        ...palettes,
        [colorClass]: palette<K>(baseColors[colorClass], colorMapping, noCache),
      }
    },
    {},
  ) as ColorSet<P, K>
}
