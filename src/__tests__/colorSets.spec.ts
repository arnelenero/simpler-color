import colorSet from '../colorSet'

describe('colorSets', () => {
  const baseColors = {
    blues: 'blue',
    reds: 'red',
    greens: 'green',
  }

  it('returns a keyed list of palette getters for all the base colors', () => {
    const colors = colorSet(baseColors)
    expect(colors).toBeInstanceOf(Object)
    expect(colors.blues).toBeInstanceOf(Function)
    expect(colors.reds).toBeInstanceOf(Function)
    expect(colors.greens).toBeInstanceOf(Function)
  })

  it('uses `lightness` color mapping function by default for all palettes', () => {
    const colors = colorSet(baseColors)
    expect(colors.blues(40)).toBe('hsl(240, 100%, 40%)')
    expect(colors.reds(40)).toBe('hsl(0, 100%, 40%)')
    expect(colors.greens(40)).toBe('hsl(120, 100%, 40%)')
  })

  it('can apply a custom color mapping function to all palettes', () => {
    const fooColor = () => 'foo'
    const colors = colorSet(baseColors, fooColor)
    expect(colors.blues(40)).toBe('foo')
    expect(colors.reds(40)).toBe('foo')
    expect(colors.greens(40)).toBe('foo')
  })

  it('enables caching of color mapping for all palettes by default', () => {
    const fooColor = jest.fn().mockReturnValue('foo')
    const colors = colorSet(baseColors, fooColor)
    for (let i = 0; i < 3; i++) colors.blues(40)
    for (let i = 0; i < 3; i++) colors.reds(40)
    for (let i = 0; i < 3; i++) colors.greens(40)
    expect(fooColor).toHaveBeenCalledTimes(3)
  })

  it('supports disabling the caching of color mapping for all palettes', () => {
    const fooColor = jest.fn().mockReturnValue('foo')
    const colors = colorSet(baseColors, fooColor, true)
    for (let i = 0; i < 3; i++) colors.blues(40)
    for (let i = 0; i < 3; i++) colors.reds(40)
    for (let i = 0; i < 3; i++) colors.greens(40)
    expect(fooColor).toHaveBeenCalledTimes(9)
  })
})
