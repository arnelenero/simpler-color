import saturation from '../saturation'

describe('saturation', () => {
  it('returns a new hex color value with adjusted % saturation', () => {
    const color = saturation('blue', 40)
    expect(color).toBe('#4D4DB3')
  })

  it('returns the base color if key is not a number', () => {
    const color = saturation('blue', 'foo')
    expect(color).toBe('blue')
  })

  it('sets the S value to 100% if key exceeds 100', () => {
    const color = saturation('blue', 150)
    expect(color).toBe('#0000FF')
  })

  it('sets the S value to 0% if key is negative', () => {
    const color = saturation('blue', -50)
    expect(color).toBe('#808080')
  })

  it('throws if base color is invalid', () => {
    expect(() => {
      return saturation('bluish', 10)
    }).toThrow()
  })
})
