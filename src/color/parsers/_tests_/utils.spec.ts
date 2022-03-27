import {
  alphaSeparatorMatcher,
  cssNumberMatcher,
  exact,
  extractValuesFromMatch,
  separatorMatcher,
} from '../utils'

describe('exact', () => {
  it('returns a new regex that is restricted to exact matches only', () => {
    const regex = /[0-9]+/
    const exactRegex = exact(regex)
    expect(regex.test(' 123 ')).toBe(true)
    expect(exactRegex.test(' 123 ')).toBe(false)
    expect(exactRegex.test('123')).toBe(true)
  })

  it('retains the original flags (if any)', () => {
    const regex = /[a-z]+/i
    expect(exact(regex).test('Abc')).toBe(true)
  })
})

describe('extractValuesFromMatch', () => {
  it('returns an array containing only the color components', () => {
    const match = ['#ffaaddee', 'ff', 'aa', 'dd', 'ee'] as RegExpExecArray
    expect(extractValuesFromMatch(match)).toEqual(['ff', 'aa', 'dd', 'ee'])
  })

  it('removes undefined items', () => {
    const match = ['#ffaadd', 'ff', 'aa', 'dd', undefined] as RegExpExecArray
    expect(extractValuesFromMatch(match)).toEqual(['ff', 'aa', 'dd'])
  })
})

describe('cssNumberMatcher', () => {
  const matcher = exact(cssNumberMatcher)

  const valid = [
    '255', // integer
    '4.5', // non-integer
    '0.1', // fraction
    '.1', // fraction with no leading zero
    '007', // leading zeros
    '1.000', // trailing decimal zeros
    '-255', // negative
    '+255', // explicit positive sign
    '1.28e+2', // scientific notation
    '1.28E-2', // uppercase scientific notation
    '-01.2800e+02', // combination of above
  ]
  valid.forEach(str => {
    it(`tests true for exact match with valid CSS number string: ${str}`, () => {
      expect(matcher.test(str)).toBe(true)
    })
  })

  const invalid = [
    '1,000', // comma
    '1.', // missing digit following decimal point
    '1.0.0', // excess decimal points
    '1_000', // numeric separator
    'FF', // hexadecimal
    'foo', // totally not a number
  ]
  invalid.forEach(str => {
    it(`tests false for exact match with invalid CSS number string: ${str}`, () => {
      expect(matcher.test(str)).toBe(false)
    })
  })
})

describe('separatorMatcher', () => {
  const matcher = exact(separatorMatcher)

  const valid = [',', ' ,', ', ', ' , ', ' ']
  valid.forEach(str => {
    it(`tests true for exact match with valid separator: '${str}'`, () => {
      expect(matcher.test(str)).toBe(true)
    })
  })

  const invalid = [',,', ', ,', ', , ', '/']
  invalid.forEach(str => {
    it(`tests false for exact match with invalid separator: '${str}'`, () => {
      expect(matcher.test(str)).toBe(false)
    })
  })
})

describe('alphaSeparatorMatcher', () => {
  const matcher = exact(alphaSeparatorMatcher)

  const valid = [',', ', ', ' ,', ' , ', '/', '/ ', ' /', ' / ']
  valid.forEach(str => {
    it(`tests true for exact match with valid separator: '${str}'`, () => {
      expect(matcher.test(str)).toBe(true)
    })
  })

  const invalid = [',,', ', ,', ', , ', ',/', ', /', ',/ ', ', / ']
  invalid.forEach(str => {
    it(`tests false for exact match with invalid separator: '${str}'`, () => {
      expect(matcher.test(str)).toBe(false)
    })
  })
})
