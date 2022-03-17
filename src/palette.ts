import lightness from './mappings/lightness'

import type { StringOrNumber } from './utils'

/** Function for generating palette colors from base color */
export type ColorMapping<K extends StringOrNumber = StringOrNumber> = (
  baseColor: string,
  key: K,
) => string

/** Getter function for palette colors */
export type Palette<K extends StringOrNumber = StringOrNumber> = (
  key?: K,
) => string

/**
 * Builds a color palette and returns a getter function for
 * accessing palette colors
 *
 * @param baseColor
 * @param colorMapping - optional custom function for generating colors
 * @param noCache - option to disable caching of color mapping
 * @returns getter function for palette color
 */
export default function palette<K extends StringOrNumber>(
  baseColor: string,
  colorMapping: ColorMapping<K> = lightness,
  noCache?: boolean,
): Palette<K> {
  // Use cache to avoid potentially expensive recalculations
  const cache: Record<StringOrNumber, string> = {}
  const cachedColorMapping: ColorMapping<K> = (baseColor, key) => {
    if (cache[key] === undefined) {
      cache[key] = colorMapping(baseColor, key)
    }
    return cache[key]
  }

  const generate = noCache ? colorMapping : cachedColorMapping

  return (key?: K) => (key !== undefined ? generate(baseColor, key) : baseColor)
}
