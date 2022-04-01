import { isRgbString, matchRgbString } from '../rgbString'

describe('isRgbString', () => {
  const valid = [
    'rgb(127, 255, 64)', // comma separated
    'rgb(127, 255, 64, 0.1)', // comma separated with opacity
    'rgb(127, 255, 64, 10%)', // % opacity
    'rgb(50%, 100%, 25%, 0.1)', // % values
    'rgb(240,255,64,0.1)', // comma separated without spaces
    'rgb(320, 255.5, -64, 10)', // out of range values
    'rgb(127 255 64)', // space separated (CSS Color Level 4)
    'rgb(127 255 64 / 0.1)', // space separated with opacity
    'rgb(127 255 64 / 10%)', // space separated % opacity
    'rgb(50% 100% 25% / 0.1)', // space separated % values
    'rgb(127 255 64/0.1)', // no spaces around slash
    'rgba(127, 255, 64, 0.1)', // rgba() alias
    'rgba(127, 255, 64)', // rgba() without opacity
    'rgba(127 255 64 / 0.1)', // rgba() space separated
    'RGB(127, 255, 64)', // case insensitive
  ]
  valid.forEach(str => {
    it(`returns true for valid rgb string: ${str}`, () => {
      expect(isRgbString(str)).toBe(true)
    })
  })

  const invalid = [
    'hsl(240, 100%, 50%)', // different color model
    '#88FFFF', // hex string
    'blue', // color name
    ' rgb(127, 255, 64, 0.1) ', // untrimmed spaces
    'rgb(127 255 64 0.1)', // missing slash in space separated alpha
    'rainbow', // invalid color string
  ]
  invalid.forEach(str => {
    it(`returns false for invalid rgb string: ${str}`, () => {
      expect(isRgbString(str)).toBe(false)
    })
  })
})

describe('matchRgbString', () => {
  it('returns RGB and alpha (opacity) values in an array', () => {
    const str = 'rgb(127, 255, 64, 0.1)'
    expect(matchRgbString(str)).toEqual(['127', '255', '64', '0.1'])
  })

  it('captures percentage opacity', () => {
    const str = 'rgb(127, 255, 64, 100%)'
    expect(matchRgbString(str)).toEqual(['127', '255', '64', '100%'])
  })

  it('captures percentage values', () => {
    const str = 'rgb(50%, 100%, 25%, 0.1)'
    expect(matchRgbString(str)).toEqual(['50%', '100%', '25%', '0.1'])
  })

  it('captures negative values', () => {
    const str = 'rgb(-127, -255, -64, -0.1)'
    expect(matchRgbString(str)).toEqual(['-127', '-255', '-64', '-0.1'])
  })

  it('returns only a 3-item array if color has no alpha value', () => {
    const str = 'rgb(127, 255, 64)'
    expect(matchRgbString(str)).toEqual(['127', '255', '64'])
  })

  it('returns null if string is not a valid rgb string', () => {
    const str = 'hsl(240 100% 50%)'
    expect(matchRgbString(str)).toBeNull()
  })
})
