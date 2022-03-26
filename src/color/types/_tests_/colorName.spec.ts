import { isColorName, named } from '../colorName'

describe('isColorName', () => {
  Object.keys(named).forEach(name => {
    it(`returns true for recognized color name: ${name}`, () => {
      expect(isColorName(name)).toBe(true)
    })
  })

  it('is not case sensitive', () => {
    expect(isColorName('royalblue')).toBe(true)
    expect(isColorName('RoyalBlue')).toBe(true)
  })

  const invalid = [
    '#33CCFF', // hex color value
    'rgb(127, 255, 255)', // non-hex color value
    ' blue ', // untrimmed spaces
    'transparent', // special keyword
    'rainbow', // invalid color string
  ]
  invalid.forEach(str => {
    it(`returns false for invalid color name: ${str}`, () => {
      expect(isColorName(str)).toBe(false)
    })
  })
})
