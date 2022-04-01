import colorString from './color/colorString'
import rgb from './color/rgb'

/**
 * Normalizes the color string format into either hex or
 * rgba
 *
 * If the color is translucent, i.e. alpha/opacity value
 * is less than 1, it is returned as rgba. The 8-digit hex
 * format is not preferred, to support older browsers.
 *
 * @param color
 * @returns normalized color string
 * @throws if `color` is not a valid color value
 */
export default function normalize(color: string): string {
  return colorString(rgb(color))
}
