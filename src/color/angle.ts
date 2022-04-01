/**
 * Converts an angle value to degrees
 *
 * @param angle - numeric angle value
 * @param unit - angle unit to convert from
 * @returns converted angle value in degrees
 */
export function toDegrees(angle: number, unit: string): number {
  const multiplier: Record<string, number> = {
    rad: 180 / Math.PI,
    grad: 0.9,
    turn: 360,
  }
  return angle * (multiplier[unit.toLowerCase()] ?? 1)
}

/**
 * Normalizes angle value (in degrees) to range [0..360)
 *
 * @param degrees - numeric angle value
 * @returns normalized angle value
 */
export function normalizeAngle(degrees: number): number {
  return ((degrees % 360) + 360) % 360
}

/**
 * Extracts the numeric value (in degrees) from an angle
 * string
 *
 * The following CSS angle units are supported: `deg`,
 * `rad`, `grad`, and `turn`. Default unit is `deg`.
 * Unit conversion is done as necessary.
 *
 * @param str - CSS angle string
 * @returns numeric value normalized to range [0..360), or `NaN`
 */
export default function angle(str: string): number {
  const num = parseFloat(str)
  const unit = str.match(/deg|rad|grad|turn/i)?.[0] ?? 'deg'
  return normalizeAngle(toDegrees(num, unit))
}
