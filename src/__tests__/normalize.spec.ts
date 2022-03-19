import Color from 'color'

import normalize from '../normalize'

describe('normalize', () => {
  it('returns hex value if the color is opaque', () => {
    const opaques = ['blue', '#0000FF', 'rgb(0, 0, 255)', 'hsl(240, 100%, 50%)']
    opaques.forEach(color => {
      expect(normalize(color)).toBe('#0000FF')
    })
  })

  it('returns rgba value if the color is translucent/transparent', () => {
    const nonOpaques = [
      'transparent',
      '#0000FF88',
      'rgba(0, 0, 255, 0.5)',
      'hsla(240, 100%, 100%, 0.5)',
    ]
    nonOpaques.forEach(color => {
      const isRgba = normalize(color).indexOf('rgba(') > -1
      expect(isRgba).toBe(true)
    })
  })

  it('supports `Color` object as input', () => {
    const color = Color('blue')
    expect(normalize(color)).toBe('#0000FF')
  })

  it('throws if color value is invalid', () => {
    expect(() => {
      return normalize('bluish')
    }).toThrow()
  })
})
