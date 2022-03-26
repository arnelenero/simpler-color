import { isHslString, matchHslString } from '../hslString'

describe('isHslString', () => {
  const valid = [
    'hsl(240, 100%, 50%)', // comma separated
    'hsl(240, 100%, 50%, 0.1)', // comma separated with opacity
    'hsl(240, 100%, 50%, 10%)', // % opacity
    'hsl(240,100%,50%,0.1)', // comma separated without spaces
    'hsl(180deg, 100%, 50%, 0.1)', // hue with 'deg'
    'hsl(3.14rad, 100%, 50%, 0.1)', // hue with 'rad'
    'hsl(200grad, 100%, 50%, 0.1)', // hue with 'grad'
    'hsl(0.5turn, 100%, 50%, 0.1)', // hue with 'turn'
    'hsl(480, 100.5%, -50%, 10)', // out of range values
    'hsl(240 100% 50%)', // space separated (CSS Color Level 4)
    'hsl(240 100% 50% / 0.1)', // space separated with opacity
    'hsl(240 100% 50% / 10%)', // space separated with % opacity
    'hsl(240deg 100% 50% / 0.1)', // space separated with hue unit
    'hsl(240 100% 50%/0.1)', // no spaces around slash
    'hsla(240, 100%, 50%)', // hsla() alias
    'hsla(240, 100%, 50%, 0.1)', // hsla() with opacity
    'HSL(240Deg, 100%, 50%)', // case insensitive
  ]
  valid.forEach(str => {
    it(`returns true for valid hsl string: ${str}`, () => {
      expect(isHslString(str)).toBe(true)
    })
  })

  const invalid = [
    'rgb(127, 255, 255)', // different color model
    '#88FFFF', // hex string
    'blue', // color name
    'hsl(240, 1, 0.5, 0.1)', // missing % sign
    ' hsl(240, 100%, 50%, 0.1) ', // untrimmed spaces
    'hsl(240 100% 50% 0.1)', // missing slash in space separated alpha
    'rainbow', // invalid color string
  ]
  invalid.forEach(str => {
    it(`returns false for invalid hsl string: ${str}`, () => {
      expect(isHslString(str)).toBe(false)
    })
  })
})

describe('matchHslString', () => {
  it('returns HSL and alpha (opacity) values in an array', () => {
    const str = 'hsl(240, 100%, 50%, 0.1)'
    expect(matchHslString(str)).toEqual(['240', '100', '50', '0.1'])
  })

  it('captures percentage opacity', () => {
    const str = 'hsl(240, 100%, 50%, 10%)'
    expect(matchHslString(str)).toEqual(['240', '100', '50', '10%'])
  })

  const hueWithUnit = ['180deg', '3.14rad', '200grad', '0.5turn']
  hueWithUnit.forEach(hue => {
    it(`captures hue angle with unit: ${hue}`, () => {
      const str = `hsl(${hue} 100% 50% / 0.1)`
      expect(matchHslString(str)).toEqual([hue, '100', '50', '0.1'])
    })
  })

  it('captures negative values', () => {
    const str = 'hsl(-240, -100%, -50%, -0.1)'
    expect(matchHslString(str)).toEqual(['-240', '-100', '-50', '-0.1'])
  })

  it('returns alpha value as undefined if not specified in string', () => {
    const str = 'hsl(240, 100%, 50%)'
    expect(matchHslString(str)).toEqual(['240', '100', '50', undefined])
  })

  it('returns null if string is not a valid hsl string', () => {
    const str = 'rgb(127, 255, 64)'
    expect(matchHslString(str)).toBeNull()
  })
})
