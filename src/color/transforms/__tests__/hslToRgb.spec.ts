import hslToRgb from '../hslToRgb'

describe('hslToRgb', () => {
  const hsl = {
    red: { h: 0, s: 100, l: 50, a: 1 },
    green: { h: 120, s: 100, l: 50, a: 1 },
    blue: { h: 240, s: 100, l: 50, a: 1 },
    white: { h: NaN, s: 0, l: 100, a: 1 },
    black: { h: NaN, s: 0, l: 0, a: 1 },
    gray: { h: NaN, s: 0, l: 50, a: 1 },
    bluish: { h: 240, s: 30, l: 40, a: 1 },
  }

  it('converts {h,s,l} object to {r,g,b}', () => {
    expect(hslToRgb(hsl.red)).toEqual({ r: 255, g: 0, b: 0, a: 1 })
    expect(hslToRgb(hsl.green)).toEqual({ r: 0, g: 255, b: 0, a: 1 })
    expect(hslToRgb(hsl.blue)).toEqual({ r: 0, g: 0, b: 255, a: 1 })
    expect(hslToRgb(hsl.bluish)).toEqual({ r: 71.4, g: 71.4, b: 132.6, a: 1 })
  })

  it('recognizes a hue value of NaN (to mean "powerless") in grayscale', () => {
    expect(hslToRgb(hsl.white)).toEqual({ r: 255, g: 255, b: 255, a: 1 })
    expect(hslToRgb(hsl.black)).toEqual({ r: 0, g: 0, b: 0, a: 1 })
    expect(hslToRgb(hsl.gray)).toEqual({ r: 127.5, g: 127.5, b: 127.5, a: 1 })
  })

  it('carries over any alpha value', () => {
    expect(hslToRgb({ h: 240, s: 100, l: 50, a: 0.8 })).toHaveProperty('a', 0.8)
  })
})
