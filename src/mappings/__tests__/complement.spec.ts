import complement from '../rotation'

describe('complement', () => {
  it('returns a new hex color value with hue rotated by 180˚', () => {
    const color = complement('blue', 1)
    expect(color).toBe('#0400FF')
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
