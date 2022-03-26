/**
 * Creates a modified version of the regular expression
 * that is restricted to exact matches only
 *
 * @param regex
 * @returns modified regex including original flags (if any)
 */
export function exact(regex: RegExp): RegExp {
  return new RegExp(`^${regex.source}$`, regex.flags)
}

/** Regular expression for valid CSS number */
export const cssNumberMatcher = /[+-]?(?=\.\d|\d)\d*(?:\.\d+)?(?:[eE][+-]?\d+)?/

/** Regular expression for color component separator */
export const separatorMatcher = /(?=[,\s])\s*(?:,\s*)?/

/** Regular expression for alpha separator */
export const alphaSeparatorMatcher = /\s*[,\/]\s*/
