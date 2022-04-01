import harmony from '../harmony'

describe('harmony', () => {
  it('returns a standardized set of base colors', () => {
    const baseColors = harmony('#0000FF')
    expect(baseColors).toEqual({
      primary: '#0000FF',
      secondary: '#806C93',
      accent: '#E61980',
      neutral: '#797986',
      error: '#BB2211',
    })
  })

  it('normalizes primary color if base is not in hex format', () => {
    const baseColors = harmony('blue')
    expect(baseColors.primary).toBe('#0000FF')
  })

  it('supports translucent base color', () => {
    const baseColors = harmony('rgba(0, 0, 255, 0.5)')
    expect(baseColors).toEqual({
      primary: 'rgba(0, 0, 255, 0.5)',
      secondary: 'rgba(128, 108, 147, 0.5)',
      accent: 'rgba(230, 25, 128, 0.5)',
      neutral: 'rgba(121, 121, 134, 0.5)',
      error: '#BB2211',
    })
  })
})
