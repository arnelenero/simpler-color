import colorSet from './colorSet'

import type { BaseColors, ColorSet } from './colorSet'
import type { ColorMapping } from './palette'
import type { StringOrNumber } from './utils'

/** Function that maps color roles to specific colors from palettes */
export type ColorRoleMapping<
  P extends string,
  K extends StringOrNumber,
  R extends string,
> = (colors: ColorSet<P, K>) => ColorScheme<R>

/** Optional configuration for color scheme */
export interface ColorSchemeOptions<K extends StringOrNumber> {
  /** Custom function for generating palette colors */
  colorMapping?: ColorMapping<K>
  /** Disables caching of color mapping */
  noCache?: boolean
}

/** Mapping of color roles to specific colors */
export type ColorScheme<R extends string = string> = Record<R, string>

/**
 * Builds a color scheme by creating palettes from the
 * given base colors, and mapping color roles to specific
 * palette colors
 *
 * @param baseColors - list of base colors keyed by palette name
 * @param roleMapping - function that maps roles to colors
 * @param options - optional config for creating palettes
 * @returns color scheme object
 */
export default function colorScheme<
  P extends string,
  K extends StringOrNumber,
  R extends string,
>(
  baseColors: BaseColors<P>,
  roleMapping: ColorRoleMapping<P, K, R>,
  options?: ColorSchemeOptions<K>,
): ColorScheme<R> {
  const { colorMapping, noCache } = options ?? {}
  const colors = colorSet<P, K>(baseColors, colorMapping, noCache)

  return roleMapping(colors)
}
