import rgbToHsl from '../rgbToHsl'

describe('rgbToHsl', () => {
  const rgb = {
    red: { r: 255, g: 0, b: 0, a: 1 },
    green: { r: 0, g: 255, b: 0, a: 1 },
    blue: { r: 0, g: 0, b: 255, a: 1 },
    white: { r: 255, g: 255, b: 255, a: 1 },
    black: { r: 0, g: 0, b: 0, a: 1 },
    palegreen: { r: 152, g: 251, b: 152, a: 1 },
  }

  it('converts {r,g,b} values to {h,s,l}', () => {
    expect(rgbToHsl(rgb.red)).toEqual({ h: 0, s: 100, l: 50, a: 1 })
    expect(rgbToHsl(rgb.green)).toEqual({ h: 120, s: 100, l: 50, a: 1 })
    expect(rgbToHsl(rgb.blue)).toEqual({ h: 240, s: 100, l: 50, a: 1 })
    expect(rgbToHsl(rgb.white)).toEqual({ h: 0, s: 0, l: 100, a: 1 })
    expect(rgbToHsl(rgb.black)).toEqual({ h: 0, s: 0, l: 0, a: 1 })
    const paleGreen = rgbToHsl(rgb.palegreen)
    expect(paleGreen.h).toBe(120)
    expect(paleGreen.s).toBeCloseTo(92.52)
    expect(paleGreen.l).toBeCloseTo(79.02)
  })

  it('carries over any alpha value', () => {
    expect(rgbToHsl({ r: 255, g: 0, b: 128, a: 0.8 })).toHaveProperty('a', 0.8)
  })
})
