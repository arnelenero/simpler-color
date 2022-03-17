import analogue from '../analogue'

describe('analogue', () => {
  it('returns a new hex color value with hue rotated in steps of 39˚', () => {
    const color = analogue('blue', 1)
    expect(color).toBe('#7F00FF')
  })

  it('returns the base color if key is not a number', () => {
    const color = analogue('blue', 'foo')
    expect(color).toBe('blue')
  })

  it('returns the base color if key is 0', () => {
    const color = analogue('blue', 0)
    expect(color).toBe('blue')
  })

  it('throws if base color is invalid', () => {
    expect(() => {
      return analogue('bluish', 10)
    }).toThrow()
  })
})
