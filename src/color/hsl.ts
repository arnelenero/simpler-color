import { clamp } from '../utils'
import angle from './angle'
import { matchHslString } from './parsers/hslString'

export interface HSL {
  h: number
  s: number
  l: number
  a: number
}

function hslFromHslString(colorString: string): HSL | null {
  const match = matchHslString(colorString)
  if (!match) return null

  const hslValues = match.map(val => parseFloat(val))

  let alpha = hslValues[3] ?? 1
  // Convert % alpha to fraction
  if (match[3]?.indexOf('%') > -1) {
    alpha *= 0.01
  }

  return {
    h: angle(match[0]),
    s: clamp(hslValues[1], 0, 100),
    l: clamp(hslValues[2], 0, 100),
    a: clamp(alpha, 0, 1),
  }
}

/**
 * Creates an HSL model from a given color string
 *
 * @param colorString - CSS color string
 * @returns an `{h,s,l,a}` color object (or `null` if invalid color string)
 */
export default function hsl(colorString: string): HSL | null {
  colorString = colorString.trim()

  return hslFromHslString(colorString)
}
