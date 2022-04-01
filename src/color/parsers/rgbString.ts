import {
  alphaSeparatorMatcher,
  cssNumberMatcher,
  exact,
  extractValuesFromMatch,
  separatorMatcher,
} from './utils'

/** Color string in `rgb()` or `rgba()` format */
export type RgbString = `rgb(${string})` | `rgba(${string})`

const num = cssNumberMatcher.source
const sep = separatorMatcher.source
const asep = alphaSeparatorMatcher.source

/**
 * Regular expression for RGB color string
 *
 * The pattern is less strict than actual CSS, mainly for
 * performance reasons. Notably, it does NOT impose:
 * - consistent separator (comma vs. space)
 * - consistent unit of color components (number value vs. percentage)
 */
export const rgbMatcher = new RegExp(
  `rgba?\\(\\s*(${num}%?)${sep}(${num}%?)${sep}(${num}%?)(?:${asep}(${num}%?))?\\s*\\)`,
  'i',
)

/**
 * Checks if a given string is a valid RGB color string
 *
 * @param colorString
 * @returns true/false (type predicate for `RgbString` in TS)
 */
export function isRgbString(colorString: string): colorString is RgbString {
  return exact(rgbMatcher).test(colorString)
}

/**
 * Attempts to match the given color string with the RGB
 * string pattern, and extracts the color components
 *
 * @param colorString
 * @returns an array containing the matched RGB values, or `null`
 */
export function matchRgbString(colorString: string): string[] | null {
  const match = exact(rgbMatcher).exec(colorString)
  return match ? extractValuesFromMatch(match) : null
}
