export type StringOrNumber = string | number

/**
 * Restricts a numerical value between a minimum and
 * a maximum
 *
 * @param value
 * @param min
 * @param max
 * @returns either the same value, the min or the max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(value, max))
}
