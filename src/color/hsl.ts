import { clamp } from '../utils'
import angle, { normalizeAngle } from './angle'
import { matchHslString } from './parsers/hslString'
import { rgbFromColorString } from './rgb'
import rgbToHsl from './transforms/rgbToHsl'

/** Object model of a color in the HSL space */
export interface HSL {
  h: number
  s: number
  l: number
  a: number
}

/**
 * Checks if the given value is an HSL object
 *
 * @param color - value to inspect
 * @returns true/false (type predicate for `HSL` in TS)
 */
export function isHsl(color: any): color is HSL {
  return (
    typeof color.h === 'number' &&
    typeof color.s === 'number' &&
    typeof color.l === 'number' &&
    typeof color.a === 'number'
  )
}

/**
 * Normalizes the color component values of an HSL object
 * to range [0..360) for h, [0..100] for s,l and [0..1]
 * for alpha
 *
 * @param hsl - HSL object
 * @returns a new HSL object with the normalized values
 */
export function normalizeHsl(hsl: HSL): HSL {
  return {
    h: normalizeAngle(hsl.h),
    s: clamp(hsl.s, 0, 100),
    l: clamp(hsl.l, 0, 100),
    a: clamp(hsl.a, 0, 1),
  }
}

function hslFromParsedHslString(match: string[]): HSL {
  const hslValues = match.map(val => parseFloat(val))

  let alpha = hslValues[3] ?? 1
  // Convert % alpha to fraction
  if (match[3]?.indexOf('%') > -1) {
    alpha *= 0.01
  }

  return normalizeHsl({
    h: angle(match[0]),
    s: hslValues[1],
    l: hslValues[2],
    a: alpha,
  })
}

function hslFromRgbString(colorString: string): HSL | null {
  const rgbColor = rgbFromColorString(colorString)
  return rgbColor ? rgbToHsl(rgbColor) : null
}

/**
 * Creates an HSL model from a given HSL-based color string
 *
 * @param colorString - CSS color string
 * @returns an `{h,s,l,a}` color object (or `null` if invalid color string)
 */
export function hslFromColorString(colorString: string): HSL | null {
  colorString = colorString.trim()

  let match: string[] | null
  if ((match = matchHslString(colorString)) !== null)
    return hslFromParsedHslString(match)

  return null
}

/**
 * Creates an HSL model from a given color string
 *
 * @param colorString - CSS color string
 * @returns an `{h,s,l,a}` color object
 * @throws if argument is not a valid color string
 */
export default function hsl(colorString: string): HSL {
  const hslObj =
    hslFromColorString(colorString) ?? hslFromRgbString(colorString)

  if (hslObj === null) throw new Error('Invalid color string')

  return hslObj
}
