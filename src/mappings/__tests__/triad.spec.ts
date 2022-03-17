import triad from '../triad'

describe('triad', () => {
  it('returns a new hex color value with hue rotated in steps of 120˚', () => {
    const color = triad('blue', 1)
    expect(color).toBe('#FF0000')
  })

  it('rotates the hue in the opposite direction if key is negative', () => {
    const color = triad('blue', -1)
    expect(color).toBe('#00FF00')
  })

  it('returns the base color if key is not a number', () => {
    const color = triad('blue', 'foo')
    expect(color).toBe('blue')
  })

  it('returns the base color if key is 0', () => {
    const color = triad('blue', 0)
    expect(color).toBe('blue')
  })

  it('throws if base color is invalid', () => {
    expect(() => {
      return triad('bluish', 10)
    }).toThrow()
  })
})
