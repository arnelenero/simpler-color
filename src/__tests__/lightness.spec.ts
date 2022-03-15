import lightness from '../lightness'

describe('lightness', () => {
  it('returns an HSL value with L equal to key %', () => {
    const color = lightness('blue', 40)
    expect(color).toBe('hsl(240, 100%, 40%)')
  })

  it('returns the base color if key is not a number', () => {
    const color = lightness('blue', 'foo')
    expect(color).toBe('blue')
  })

  it('sets the L value to 100% if key exceeds 100', () => {
    const color = lightness('blue', 150)
    expect(color).toBe('hsl(240, 100%, 100%)')
  })

  it('sets the L value to 0% if key is negative', () => {
    const color = lightness('blue', -50)
    expect(color).toBe('hsl(240, 100%, 0%)')
  })

  it('throws if base color is invalid', () => {
    expect(() => {
      return lightness('bluish', 10)
    }).toThrow()
  })
})
