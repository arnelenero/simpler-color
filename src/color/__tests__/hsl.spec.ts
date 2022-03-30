import hsl, { isHsl, normalizeHsl } from '../hsl'

describe('isHsl', () => {
  it('returns true if value is a valid HSL object', () => {
    expect(isHsl({ h: 240, s: 100, l: 50, a: 1 })).toBe(true)
  })

  const invalid = [
    { h: 240, s: 100, l: 50 },
    { h: '240', s: '100', l: '50', a: '1' },
    { r: 255, g: 0, b: 64, a: 1 },
    [240, 100, 50, 1],
    'hsla(240, 100%, 50%, 1)',
    '#FF0033',
    'blue',
  ]
  invalid.forEach(val => {
    it(`returns false if value is not a valid HSL object: ${val}`, () => {
      expect(isHsl(val)).toBe(false)
    })
  })
})

describe('normalizeHsl', () => {
  it('returns a new HSL object and does not mutate the original', () => {
    const obj = { h: 240, s: 100, l: 50, a: 1 }
    expect(normalizeHsl(obj)).not.toBe(obj)
  })

  it('clamps h to [0..360), s,l to [0..100] and alpha to [0..1]', () => {
    const belowMin = { h: -90, s: -1, l: -1, a: -1 }
    const aboveMax = { h: 360, s: 101, l: 101, a: 10 }
    expect(normalizeHsl(belowMin)).toEqual({ h: 270, s: 0, l: 0, a: 0 })
    expect(normalizeHsl(aboveMax)).toEqual({ h: 0, s: 100, l: 100, a: 1 })
  })

  it('does not modify h value if it is NaN', () => {
    expect(normalizeHsl({ h: NaN, s: 0, l: 0, a: 1 }).h).toBeNaN()
  })

  it('does not round off h,s,l values that are within range', () => {
    const nonInteger = { h: 239.5, s: 0.01, l: 33.333, a: 0.9 }
    expect(normalizeHsl(nonInteger)).toEqual(nonInteger)
  })
})

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

  values = [
    '#FF33CC',
    '#FF33CCFF',
    'rgb(255, 51, 204)',
    'rgba(255, 51, 204, 1.0)',
    'rgb(100% 20% 80% / 100%)',
  ]
  values.forEach(color => {
    it(`converts values from RGB string: ${color}`, () => {
      expect(hsl(color)).toEqual({ h: 315, s: 100, l: 60, a: 1 })
    })
  })

  it('converts CSS color names/keywords into HSL', () => {
    expect(hsl('blue')).toEqual({ h: 240, s: 100, l: 50, a: 1 })
    expect(hsl('transparent')).toEqual({ h: NaN, s: 0, l: 0, a: 0 })
  })

  values = ['#FF33CC', 'rgb(255, 51, 204)', 'blue', 'transparent']
  values.forEach(color => {
    it(`does not recognize non-HSL string if \`only\` flag is true: ${color}`, () => {
      expect(hsl(color, true)).toBeNull()
    })
  })

  it('returns null if not a valid color string', () => {
    expect(hsl('foo')).toBeNull()
  })
})
