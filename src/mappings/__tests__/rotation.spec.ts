import rotation from '../rotation'

describe('rotation', () => {
  it('returns a new hex color value with hue rotated by the specified angle', () => {
    const color = rotation('blue', 180)
    expect(color).toBe('#FFFF00')
  })

  it('returns the base color if key is not a number', () => {
    const color = rotation('blue', 'foo')
    expect(color).toBe('blue')
  })

  it('returns the base color if key is 0', () => {
    const color = rotation('blue', 0)
    expect(color).toBe('blue')
  })

  it('throws if base color is invalid', () => {
    expect(() => {
      return rotation('bluish', 10)
    }).toThrow()
  })
})
