import rgb from '../rgb'

describe('rgb', () => {
  const rgbaHex = [
    '#FF33CC99',
    'rgba(255, 51, 204, 0.6)',
    'rgb(100% 20% 80% / 60%)',
  ]
  rgbaHex.forEach(color => {
    it(`returns an object with RGB values in decimal, alpha as fraction, for: ${color}`, () => {
      expect(rgb(color)).toEqual({ r: 255, g: 51, b: 204, a: 0.6 })
    })
  })

  const rgbHex = ['#FFAACC', 'rgb(255, 170, 204)']
  rgbHex.forEach(color => {
    it(`returns default alpha value of 1 for: ${color}`, () => {
      expect(rgb(color)).toEqual({ r: 255, g: 170, b: 204, a: 1 })
    })
  })

  it('expands shorthand hex value', () => {
    expect(rgb('#FAC3')).toEqual({ r: 255, g: 170, b: 204, a: 0.2 })
  })

  it('clamps the RGB values to [0..255] and alpha to [0..1]', () => {
    expect(rgb('rgb(0, -1, 256, 80)')).toEqual({ r: 0, g: 0, b: 255, a: 1 })
    expect(rgb('rgb(255.01, 0, 8, -1)')).toEqual({ r: 255, g: 0, b: 8, a: 0 })
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
