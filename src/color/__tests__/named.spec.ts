import named, { namedColors } from '../named'

describe('named', () => {
  Object.keys(namedColors).forEach(colorName => {
    it(`returns the hex string value for recognized color name: ${colorName}`, () => {
      const color = named(colorName)
      expect(typeof color).toBe('string')
      expect(color?.charAt(0)).toBe('#')
    })
  })

  it('is not case sensitive', () => {
    expect(named('royalblue')).toBeDefined()
    expect(named('RoyalBlue')).toBeDefined()
  })

  const invalid = [
    '#33CCFF', // hex color value
    'rgb(127, 255, 255)', // non-hex color value
    ' blue ', // untrimmed spaces
    'transparent', // special keyword
    'rainbow', // invalid color string
  ]
  invalid.forEach(str => {
    it(`returns undefined for invalid color name: ${str}`, () => {
      expect(named(str)).toBeUndefined()
    })
  })
})
