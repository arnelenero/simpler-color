import { exact, extractValuesFromMatch } from './utils'

export type HexString = `#${string}`

const hex = /[0-9a-fA-F]/.source

/** Regular expression for hex color string */
export const hexColorMatcher = new RegExp(
  `#(${hex}{2})(${hex}{2})(${hex}{2})(${hex}{2})?`,
)

/** Regular expression for shorthand hex color string */
export const shortHexColorMatcher = new RegExp(
  `#(${hex})(${hex})(${hex})(${hex})?`,
)

/**
 * Checks if a given string is a valid hex color string
 *
 * @param colorString
 * @returns true/false (type predicate for `HexString` in TS)
 */
export function isHexString(colorString: string): colorString is HexString {
  return (
    exact(hexColorMatcher).test(colorString) ||
    exact(shortHexColorMatcher).test(colorString)
  )
}

/**
 * Attempts to match the given color string with the hex
 * string pattern, and extracts the hex values of the RGB
 * color components (and alpha, if any)
 *
 * @param colorString
 * @returns an array containing the matched values, or `null`
 */
export function matchHexString(colorString: string): string[] | null {
  const match =
    exact(hexColorMatcher).exec(colorString) ??
    exact(shortHexColorMatcher).exec(colorString)
  return match ? extractValuesFromMatch(match) : null
}
