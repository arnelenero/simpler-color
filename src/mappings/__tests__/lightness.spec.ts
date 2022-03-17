import lightness from '../lightness'

describe('lightness', () => {
  it('returns a new hex color value with adjusted % lightness', () => {
    const color = lightness('blue', 40)
    expect(color).toBe('#0000CC')
  })

  it('returns the base color if key is not a number', () => {
    const color = lightness('blue', 'foo')
    expect(color).toBe('blue')
  })

  it('sets the L value to 100% if key exceeds 100', () => {
    const color = lightness('blue', 150)
    expect(color).toBe('#FFFFFF')
  })

  it('sets the L value to 0% if key is negative', () => {
    const color = lightness('blue', -50)
    expect(color).toBe('#000000')
  })

  it('throws if base color is invalid', () => {
    expect(() => {
      return lightness('bluish', 10)
    }).toThrow()
  })
})
