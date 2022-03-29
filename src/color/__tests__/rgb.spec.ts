import rgb from '../rgb'

describe('rgb', () => {
  let values: string[]

  it('returns an {r,g,b,a} object containing numeric values', () => {
    const obj = rgb('rgba(255, 51, 204, 0.6)')
    expect(typeof obj?.r).toBe('number')
    expect(typeof obj?.g).toBe('number')
    expect(typeof obj?.b).toBe('number')
    expect(typeof obj?.a).toBe('number')
  })

  values = ['#FF33CC99', 'rgba(255, 51, 204, 0.6)', 'rgb(100% 20% 80% / 60%)']
  values.forEach(color => {
    it(`returns red, green, blue values in decimal for: ${color}`, () => {
      const obj = rgb(color)
      expect(obj).toHaveProperty('r', 255)
      expect(obj).toHaveProperty('g', 51)
      expect(obj).toHaveProperty('b', 204)
    })
  })

  values = ['#FF33CC99', 'rgba(255, 51, 204, 0.6)', 'rgb(100% 20% 80% / 60%)']
  values.forEach(color => {
    it(`returns alpha value as fraction for: ${color}`, () => {
      expect(rgb(color)).toHaveProperty('a', 0.6)
    })
  })

  values = ['#FFAACC', 'rgb(255, 170, 204)']
  values.forEach(color => {
    it(`returns default alpha value of 1 for: ${color}`, () => {
      expect(rgb(color)).toHaveProperty('a', 1)
    })
  })

  it('expands shorthand hex value', () => {
    expect(rgb('#FAC3')).toEqual({ r: 255, g: 170, b: 204, a: 0.2 })
  })

  it('clamps the red value to [0..255]', () => {
    expect(rgb('rgb(-1, 255, 255)')).toHaveProperty('r', 0)
    expect(rgb('rgb(256, 255, 255)')).toHaveProperty('r', 255)
  })

  it('clamps the green value to [0..255]', () => {
    expect(rgb('rgb(255, -1, 255)')).toHaveProperty('g', 0)
    expect(rgb('rgb(255, 256, 255)')).toHaveProperty('g', 255)
  })

  it('clamps the blue value to [0..255]', () => {
    expect(rgb('rgb(255, 255, -1)')).toHaveProperty('b', 0)
    expect(rgb('rgb(255, 255, 256)')).toHaveProperty('b', 255)
  })

  it('clamps the alpha value to [0..1]', () => {
    expect(rgb('rgb(255, 255, 0, -1)')).toHaveProperty('a', 0)
    expect(rgb('rgb(255, 255, 0, 10)')).toHaveProperty('a', 1)
  })

  it('returns RGB values from CSS color names', () => {
    expect(rgb('blue')).toEqual({ r: 0, g: 0, b: 255, a: 1 })
    expect(rgb('yellow')).toEqual({ r: 255, g: 255, b: 0, a: 1 })
  })

  it('treats the `transparent` keyword as black with zero opacity', () => {
    expect(rgb('transparent')).toEqual({ r: 0, g: 0, b: 0, a: 0 })
  })

  it('returns null if not a valid color string', () => {
    expect(rgb('foo')).toBeNull()
  })
})
