import { clamp } from '../utils'
import hsl from './hsl'
import named from './named'
import { matchHexString } from './parsers/hexString'
import { matchRgbString } from './parsers/rgbString'
import hslToRgb from './transforms/hslToRgb'

/** Object model of a color in the RGB space */
export interface RGB {
  r: number
  g: number
  b: number
  a: number
}

/**
 * Checks if the given value is an RGB object
 *
 * @param color - value to inspect
 * @returns true/false (type predicate for `RGB` in TS)
 */
export function isRgb(color: any): color is RGB {
  return (
    typeof color.r === 'number' &&
    typeof color.g === 'number' &&
    typeof color.b === 'number' &&
    typeof color.a === 'number'
  )
}

/**
 * Normalizes the color component values of an RGB object
 * to range [0..255] for r,g,b and [0..1] for alpha
 *
 * @param rgb - RGB object
 * @returns a new RGB object with the normalized values
 */
export function normalizeRgb(rgb: RGB): RGB {
  return {
    r: clamp(rgb.r, 0, 255),
    g: clamp(rgb.g, 0, 255),
    b: clamp(rgb.b, 0, 255),
    a: clamp(rgb.a, 0, 1),
  }
}

function rgbFromHexString(colorString: string): RGB | null {
  const match = matchHexString(colorString)
  if (!match) return null

  const rgbValues = match.map(val => {
    // Expand if value is shorthand (single digit) hex
    if (val.length === 1) {
      val = `${val}${val}`
    }
    // Convert hex to decimal
    return parseInt(val, 16)
  })

  // Compute alpha as fraction of 255, defaulting to 1
  const alpha = (rgbValues[3] ?? 255) / 255

  return { r: rgbValues[0], g: rgbValues[1], b: rgbValues[2], a: alpha }
}

function rgbFromRgbString(colorString: string): RGB | null {
  const match = matchRgbString(colorString)
  if (!match) return null

  const rgbValues = match.map((val, index) => {
    let num = parseFloat(val)
    if (val.indexOf('%') > -1) {
      num *= 0.01
      // Except for alpha, value should equal % of 255
      if (index < 3) {
        num *= 255
      }
    }
    return num
  })

  return normalizeRgb({
    r: rgbValues[0],
    g: rgbValues[1],
    b: rgbValues[2],
    a: rgbValues[3] ?? 1,
  })
}

function rgbFromHslString(colorString: string): RGB | null {
  const hslColor = hsl(colorString, true)
  return hslColor ? hslToRgb(hslColor) : null
}

/**
 * Creates an RGB model from a given color string
 *
 * @param colorString - CSS color string
 * @param only - when `true`, does not convert non-RGB color
 * @returns an `{r,g,b,a}` color object (or `null` if invalid color string)
 */
export default function rgb(colorString: string, only?: boolean): RGB | null {
  colorString = colorString.trim()

  if (colorString.toLowerCase() === 'transparent')
    return { r: 0, g: 0, b: 0, a: 0 }

  // Get hex value if string is a color name
  const hexFromName = named(colorString)
  if (hexFromName) {
    colorString = hexFromName
  }

  return (
    rgbFromHexString(colorString) ??
    rgbFromRgbString(colorString) ??
    ((!only && rgbFromHslString(colorString)) || null)
  )
}
