import complement from '../complement'

describe('complement', () => {
  it('returns a new hex color value with hue rotated by 180˚ at index 1', () => {
    const color = complement('blue', 1)
    expect(color).toBe('#FFFF00')
  })

  it('returns a new hex color value with hue rotated by 180˚ + 30˚ at index 2', () => {
    const color = complement('blue', 2)
    expect(color).toBe('#80FF00')
  })

  it('rotates hue in the opposite direction if key is negative', () => {
    const color = complement('blue', -2)
    expect(color).toBe('#FF8000')
  })

  it('returns the base color if key is not a number', () => {
    const color = complement('blue', 'foo')
    expect(color).toBe('blue')
  })

  it('returns the base color if key is 0', () => {
    const color = complement('blue', 0)
    expect(color).toBe('blue')
  })

  it('throws if base color is invalid', () => {
    expect(() => {
      return complement('bluish', 10)
    }).toThrow()
  })
})
