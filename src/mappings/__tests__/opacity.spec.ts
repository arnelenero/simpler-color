import opacity from '../opacity'

describe('opacity', () => {
  it('returns an RGBA value with A equal to key', () => {
    const color = opacity('blue', 0.4)
    expect(color).toBe('rgba(0, 0, 255, 0.4)')
  })

  it('returns the base color if key is not a number', () => {
    const color = opacity('blue', 'foo')
    expect(color).toBe('blue')
  })

  it('discards the A value, and returns RGB value instead, if key equals or exceeds 1', () => {
    const color = opacity('blue', 40)
    expect(color).toBe('#0000FF')
  })

  it('sets the A value to 0 if key is negative', () => {
    const color = opacity('blue', -1)
    expect(color).toBe('rgba(0, 0, 255, 0)')
  })

  it('supports translucent base color', () => {
    const color = opacity('rgba(0, 0, 255, 0.5)', 0.1)
    expect(color).toBe('rgba(0, 0, 255, 0.1)')
  })

  it('throws if base color is invalid', () => {
    expect(() => {
      return opacity('bluish', 0.4)
    }).toThrow()
  })
})
