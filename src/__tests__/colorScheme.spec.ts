import colorScheme from '../colorScheme'

describe('colorScheme', () => {
  const baseColors = {
    blues: 'blue',
    greens: 'green',
  }
  const colorRoles = (colors: Record<string, any>) => ({
    blueButton: colors.blues(40),
    greenButton: colors.greens(40),
  })

  it('returns an object with color roles as keys', () => {
    const scheme = colorScheme(baseColors, colorRoles)
    expect(scheme).toHaveProperty('blueButton')
    expect(scheme).toHaveProperty('greenButton')
  })

  it('creates a color set from base colors and passes it to the role-mapping function', () => {
    const spiedColorRoles = jest.fn(colorRoles)
    colorScheme(baseColors, spiedColorRoles)
    const argsToColorRoles = spiedColorRoles.mock.calls[0][0]
    expect(spiedColorRoles).toHaveBeenCalled()
    expect(argsToColorRoles.blues).toBeInstanceOf(Function)
    expect(argsToColorRoles.greens).toBeInstanceOf(Function)
  })

  it('returns the result of role-mapping function', () => {
    const spiedColorRoles = jest.fn(colorRoles)
    const scheme = colorScheme(baseColors, spiedColorRoles)
    const resultOfColorRoles = spiedColorRoles.mock.results[0].value
    expect(scheme).toEqual(resultOfColorRoles)
  })

  it('supports optional custom color-mapping function for generating the color set', () => {
    const fooColor = () => 'foo'
    const scheme = colorScheme(baseColors, colorRoles, {
      colorMapping: fooColor,
    })
    expect(scheme.blueButton).toBe('foo')
    expect(scheme.greenButton).toBe('foo')
  })

  it('defaults to enable caching for color-mapping while generating the color set', () => {
    const fooColor = jest.fn().mockReturnValue('foo')
    const colorRoles = (colors: Record<string, any>) => ({
      blueButton: colors.blues(40),
      blueBar: colors.blues(40),
      blueText: colors.blues(40),
    })
    colorScheme(baseColors, colorRoles, {
      colorMapping: fooColor,
    })
    expect(fooColor).toHaveBeenCalledTimes(1)
  })

  it('supports disabling the caching for color-mapping while generating the color set', () => {
    const fooColor = jest.fn().mockReturnValue('foo')
    const colorRoles = (colors: Record<string, any>) => ({
      blueButton: colors.blues(40),
      blueBar: colors.blues(40),
      blueText: colors.blues(40),
    })
    colorScheme(baseColors, colorRoles, {
      colorMapping: fooColor,
      noCache: true,
    })
    expect(fooColor).toHaveBeenCalledTimes(3)
  })
})
