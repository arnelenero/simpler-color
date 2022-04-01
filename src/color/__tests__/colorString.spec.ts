import colorString from '../colorString'

describe('colorString', () => {
  it('returns a hex string from RGB object when alpha = 1', () => {
    const obj = { r: 255, g: 0, b: 255, a: 1 }
    expect(colorString(obj)).toBe('#FF00FF')
  })

  it('returns a hex string from HSL object when alpha = 1', () => {
    const obj = { h: 240, s: 100, l: 50, a: 1 }
    expect(colorString(obj)).toBe('#0000FF')
  })

  it('returns an rgba() string from RGB object when alpha < 1', () => {
    const obj = { r: 255, g: 0, b: 255, a: 0.6 }
    expect(colorString(obj)).toBe('rgba(255, 0, 255, 0.6)')
  })

  it('returns an rgba() string from HSL object when alpha < 1', () => {
    const obj = { h: 240, s: 100, l: 50, a: 0.8 }
    expect(colorString(obj)).toBe('rgba(0, 0, 255, 0.8)')
  })

  it('rounds off r,g,b values in rgba() strings', () => {
    const obj = { r: 127.5, g: 64.3333, b: 255, a: 0.6 }
    expect(colorString(obj)).toBe('rgba(128, 64, 255, 0.6)')
  })
})
