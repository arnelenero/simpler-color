import rotation from '../rotation'

describe('rotation', () => {
  it('returns a new hex color value with hue rotated by the specified angle', () => {
    const color = rotation('blue', 180)
    expect(color).toBe('#FFFF00')
  })

  it('rotates the hue in the opposite direction if key is negative', () => {
    const color = rotation('blue', -90)
    expect(color).toBe('#00FF80')
  })

  it('returns the base color if key is not a number', () => {
    const color = rotation('blue', 'foo')
    expect(color).toBe('blue')
  })

  it('returns the base color if key is 0', () => {
    const color = rotation('blue', 0)
    expect(color).toBe('blue')
  })

  it('supports translucent base color', () => {
    const color = rotation('rgba(0, 0, 255, 0.5)', 180)
    expect(color).toBe('rgba(255, 255, 0, 0.5)')
  })

  it('throws if base color is invalid', () => {
    expect(() => {
      return rotation('bluish', 10)
    }).toThrow()
  })
})
