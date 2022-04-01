import rgbToHsl from '../rgbToHsl'

describe('rgbToHsl', () => {
  const rgb = {
    red: { r: 255, g: 0, b: 0, a: 1 },
    green: { r: 0, g: 255, b: 0, a: 1 },
    blue: { r: 0, g: 0, b: 255, a: 1 },
    white: { r: 255, g: 255, b: 255, a: 1 },
    black: { r: 0, g: 0, b: 0, a: 1 },
    gray: { r: 128, g: 128, b: 128, a: 1 },
    palegreen: { r: 152, g: 251, b: 152, a: 1 },
  }

  it('converts {r,g,b} object to {h,s,l}', () => {
    expect(rgbToHsl(rgb.red)).toEqual({ h: 0, s: 100, l: 50, a: 1 })
    expect(rgbToHsl(rgb.green)).toEqual({ h: 120, s: 100, l: 50, a: 1 })
    expect(rgbToHsl(rgb.blue)).toEqual({ h: 240, s: 100, l: 50, a: 1 })
  })

  it('assigns a hue value of NaN (to mean "powerless") in grayscale', () => {
    expect(rgbToHsl(rgb.white).h).toBeNaN()
    expect(rgbToHsl(rgb.black).h).toBeNaN()
    expect(rgbToHsl(rgb.gray).h).toBeNaN()
  })

  it('does NOT round off saturation and lightness into integer', () => {
    const paleGreen = rgbToHsl(rgb.palegreen)
    expect(paleGreen.h).toBe(120)
    expect(paleGreen.s).toBeCloseTo(92.52)
    expect(paleGreen.l).toBeCloseTo(79.02)
  })

  it('carries over any alpha value', () => {
    expect(rgbToHsl({ r: 255, g: 0, b: 128, a: 0.8 })).toHaveProperty('a', 0.8)
  })

  it('clamps r,g,b values to [0..255]', () => {
    const hsl = rgbToHsl({ r: 256, g: -1, b: -0.5, a: 1 })
    expect(hsl).toEqual({ h: 0, s: 100, l: 50, a: 1 })
  })
})
