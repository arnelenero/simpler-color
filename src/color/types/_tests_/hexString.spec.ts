import { isHexString, matchHexString } from '../hexString'

describe('isHexString', () => {
  const valid = [
    '#33FFAA', // uppercase hex digits
    '#ff33aa', // lowercase
    '#FFaa33', // mixed uppercase and lowercase
    '#33FFAABB', // with alpha
    '#33ffaabb', // lowercase with alpha
    '#3FA', // shorthand (3-digit)
    '#3fab', // shorthand with alpha
  ]
  valid.forEach(str => {
    it(`returns true for valid hex string: ${str}`, () => {
      expect(isHexString(str)).toBe(true)
    })
  })

  const invalid = [
    'rgb(127, 255, 255)', // non-hex color string
    'blue', // color name
    'BBAADD', // missing # prefix
    ' #BBAADD ', // untrimmed spaces
    '#BB AA DD', // internal spacing
    'rainbow', // invalid color string
  ]
  invalid.forEach(str => {
    it(`returns false for invalid hex string: ${str}`, () => {
      expect(isHexString(str)).toBe(false)
    })
  })
})

describe('matchHexString', () => {
  it('returns the RGB and alpha (opacity) hex values in an array', () => {
    const str = '#FFAACCEE'
    expect(matchHexString(str)).toEqual(['FF', 'AA', 'CC', 'EE'])
  })

  it('returns alpha value as undefined if not specified in string', () => {
    const str = '#ffaabb'
    expect(matchHexString(str)).toEqual(['ff', 'aa', 'bb', undefined])
  })

  it('captures shorthand RGB and alpha hex values', () => {
    const str = '#FACE'
    expect(matchHexString(str)).toEqual(['F', 'A', 'C', 'E'])
  })

  it('returns null if string is not a valid hex string', () => {
    const str = 'rgb(127, 255, 64)'
    expect(matchHexString(str)).toBeNull()
  })
})
