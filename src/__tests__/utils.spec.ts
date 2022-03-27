import { clamp } from '../utils'

describe('clamp', () => {
  it('returns the same value if it is within range', () => {
    expect(clamp(50, 0, 100)).toBe(50)
  })

  it('limits the value to the minimum', () => {
    expect(clamp(-1, 0, 100)).toBe(0)
  })

  it('limits the value to the maximum', () => {
    expect(clamp(101, 0, 100)).toBe(100)
  })
})
