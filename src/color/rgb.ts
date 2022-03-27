import named from './named'
import { matchHexString } from './parsers/hexString'

export interface RGB {
  r: number
  g: number
  b: number
  a: number
}

export function rgbFromHexString(colorString: string): RGB | null {
  const match = matchHexString(colorString)
  if (!match) return null

  const rgbValues = match.map(val => {
    // Expand if value is shorthand (single digit) hex
    if (val.length === 1) val = `${val}${val}`
    // Convert hex to decimal
    return parseInt(val, 16)
  })

  // Compute alpha as fraction of 255, defaulting to 1
  const alpha = (rgbValues[3] ?? 255) / 255

  return { r: rgbValues[0], g: rgbValues[1], b: rgbValues[2], a: alpha }
}

export default function rgb(colorString: string): RGB | null {
  colorString = colorString.trim()

  if (colorString.toLowerCase() === 'transparent')
    return { r: 0, g: 0, b: 0, a: 0 }

  // Get hex value if string is a color name
  const hexFromName = named(colorString)
  if (hexFromName) colorString = hexFromName

  return rgbFromHexString(colorString)
}
