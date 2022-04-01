import angle from '../angle'

describe('angle', () => {
  let values: string[]

  values = ['180deg', '180']
  values.forEach(val => {
    it(`extracts straight value if angle string is in degrees (default): ${val}`, () => {
      expect(angle(val)).toBe(180)
    })
  })

  values = ['3.14159265rad', '200grad', '0.5turn']
  values.forEach(val => {
    it(`converts value to degrees if angle string is in a different unit: ${val}`, () => {
      expect(Math.round(angle(val))).toBe(180)
    })
  })

  it('normalizes value to range [0..360) degrees', () => {
    expect(angle('-90deg')).toBe(270)
    expect(angle('360deg')).toBe(0)
  })

  it('returns NaN if argument is not a valid numeric value', () => {
    expect(angle('invalid')).toBeNaN()
  })
})
