import hsl from '../hsl'

describe('hsl', () => {
  let values: string[]

  it('returns an {h,s,l,a} object containing numeric values', () => {
    const obj = hsl('hsl(180, 100%, 50%, 0.6)')
    expect(typeof obj?.h).toBe('number')
    expect(typeof obj?.s).toBe('number')
    expect(typeof obj?.l).toBe('number')
    expect(typeof obj?.a).toBe('number')
  })

  values = [
    'hsla(180, 100%, 50%, 0.6)',
    'hsl(180deg 100% 50% / 0.6)',
    'hsl(3.1416rad 100% 50% / 0.6)',
    'hsl(200grad 100% 50% / 0.6)',
    'hsl(0.5turn 100% 50% / 0.6)',
  ]
  values.forEach(color => {
    it(`returns hue value in degrees for: ${color}`, () => {
      // Round off because radian value won't yield integer
      expect(hsl(color)?.h).toBeCloseTo(180)
    })
  })

  values = ['hsla(180, 100%, 50%, 0.6)', 'hsl(180 100% 50% / 60%)']
  values.forEach(color => {
    it(`returns alpha value as fraction for: ${color}`, () => {
      expect(hsl(color)).toHaveProperty('a', 0.6)
    })
  })

  it('returns default alpha value of 1', () => {
    expect(hsl('hsl(240, 50%, 50%)')).toHaveProperty('a', 1)
  })

  it('normalizes the hue value to [0..360) degrees', () => {
    expect(hsl('hsl(-90, 50%, 50%)')).toHaveProperty('h', 270)
    expect(hsl('hsl(360, 50%, 50%)')).toHaveProperty('h', 0)
  })

  it('clamps the saturation value to [0..100]', () => {
    expect(hsl('hsl(240, -10%, 50%)')).toHaveProperty('s', 0)
    expect(hsl('hsl(240, 100.1%, 50%)')).toHaveProperty('s', 100)
  })

  it('clamps the lightness value to [0..100]', () => {
    expect(hsl('hsl(240, 50%, -10%)')).toHaveProperty('l', 0)
    expect(hsl('hsl(240, 50%, 100.1%)')).toHaveProperty('l', 100)
  })

  it('clamps the alpha value to [0..1]', () => {
    expect(hsl('hsla(240, 50%, 50%, -1)')).toHaveProperty('a', 0)
    expect(hsl('hsla(240, 50%, 50%, 10)')).toHaveProperty('a', 1)
  })

  values = ['#FF33CC99', 'rgba(255, 51, 204, 0.6)', 'rgb(100% 20% 80% / 60%)']
  values.forEach(color => {
    it(`converts values from RGB string: ${color}`, () => {
      expect(hsl(color)).toEqual({ h: 315, s: 100, l: 60, a: 0.6 })
    })
  })

  it('returns null if not a valid color string', () => {
    expect(hsl('foo')).toBeNull()
  })
})
