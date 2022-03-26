import {
  alphaSeparatorMatcher,
  cssNumberMatcher,
  exact,
  separatorMatcher,
} from './utils'

export type HslString = `hsl(${string})` | `hsla(${string})`

const num = cssNumberMatcher.source
const sep = separatorMatcher.source
const asep = alphaSeparatorMatcher.source

/**
 * Regular expression for HSL color string
 *
 * The pattern is less strict than actual CSS, mainly for
 * performance reasons. Notably, it does NOT impose
 * consistent separator (comma vs. space).
 */
export const hslMatcher = new RegExp(
  `hsla?\\(\\s*(${num}(?:deg|rad|grad|turn)?)${sep}(${num})%${sep}(${num})%(?:${asep}(${num}%?))?\\s*\\)`,
  'i',
)

/**
 * Checks if a given string is a valid HSL color string
 *
 * @param colorString
 * @returns true/false (type predicate for `HslString` in TS)
 */
export function isHslString(colorString: string): colorString is HslString {
  return exact(hslMatcher).test(colorString)
}

/**
 * Attempts to match the given color string with the HSL
 * string pattern, and extracts the color components
 *
 * Since the standard unit for S and L values is percent,
 * the % sign is not included in the captured values.
 *
 * @param colorString
 * @returns an array containing the matched HSL values, or `null`
 */
export function matchHslString(colorString: string): string[] | null {
  const match = exact(hslMatcher).exec(colorString)
  return match?.slice(1) ?? null
}
