import rgb from '../rgb'

describe('rgb', () => {
  const rgbaHex = ['#FFAACC33']
  rgbaHex.forEach(color => {
    it(`returns an object with RGB values in decimal, alpha as fraction, for: ${color}`, () => {
      expect(rgb(color)).toEqual({ r: 255, g: 170, b: 204, a: 0.2 })
    })
  })

  const rgbHex = ['#FFAACC']
  rgbHex.forEach(color => {
    it(`returns default alpha value of 1 for: ${color}`, () => {
      expect(rgb(color)).toEqual({ r: 255, g: 170, b: 204, a: 1 })
    })
  })

  it('expands shorthand hex value', () => {
    expect(rgb('#FAC3')).toEqual({ r: 255, g: 170, b: 204, a: 0.2 })
  })

  it('returns RGB values from CSS color names/keywords', () => {
    expect(rgb('blue')).toEqual({ r: 0, g: 0, b: 255, a: 1 })
    expect(rgb('yellow')).toEqual({ r: 255, g: 255, b: 0, a: 1 })
    expect(rgb('transparent')).toEqual({ r: 0, g: 0, b: 0, a: 0 })
  })

  it('returns null if not a valid color string', () => {
    expect(rgb('foo')).toBeNull()
  })
})
