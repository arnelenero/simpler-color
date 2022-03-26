import { isHslString, matchHslString } from '../hslString'

describe('isHslString', () => {
  const valid = [
    'hsl(240, 100%, 50%)', // comma separated
    'hsl(240, 100%, 50%, 0.1)', // comma separated with opacity
    'hsl(240, 100%, 50%, 10%)', // comma separated with % opacity
    'hsl(240,100%,50%,0.1)', // comma separated without spaces
    'hsl(180deg, 100%, 50%, 0.1)', // hue with 'deg'
    'hsl(3.14rad, 100%, 50%, 0.1)', // hue with 'rad'
    'hsl(200grad, 100%, 50%, 0.1)', // hue with 'grad'
    'hsl(0.5turn, 100%, 50%, 0.1)', // hue with 'turn'
    'hsl(-240, -100%, -50%, -0.1)', // negative values
    'hsl(+240, +100%, +50%, +0.1)', // explicit positive sign
    'hsl(240.5, 99.99%, 49.999%, 0.9999)', // non-integer values
    'hsl(.9, .99%, .999%, .9999)', // fraction w/o leading zero
    'hsl(0240, 0100%, 0050%, 01)', // leading zeros
    'hsl(240.0, 100.00%, 50.000%, 1.0000)', // trailing decimal zeros
    'hsl(2400, 1000%, 1000%, 10)', // out of range values
    'hsl(-2400.01deg, -1000.5%, -1000.05%, -100)', // combination of above
    'hsl(2.40e+2, 1.00e+2%, 5.00e+1%, 1E-3)', // scientific notation
    'hsl(240 100% 50%)', // space separated (CSS Color Level 4)
    'hsl(240 100% 50% / 0.1)', // space separated with opacity
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
