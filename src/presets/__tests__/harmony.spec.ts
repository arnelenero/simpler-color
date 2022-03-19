import harmony from '../harmony'

describe('harmony', () => {
  it('returns a standardized set of base colors', () => {
    const baseColors = harmony('blue')
    expect(baseColors).toEqual({
      primary: 'blue',
      secondary: '#7F6C93',
      accent: '#E61980',
      neutral: '#797986',
      error: '#BB2211',
    })
  })
})
