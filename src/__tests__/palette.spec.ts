import palette from '../palette'

describe('palette', () => {
  it('returns a function', () => {
    const blues = palette('blue')
    expect(blues).toBeInstanceOf(Function)
  })

  it('returns a palette color getter', () => {
    const blues = palette('blue')
    const blue40 = blues(40)
    expect(typeof blue40).toBe('string')
  })

  it('uses `lightness` color mapping function by default', () => {
    const blues = palette('blue')
    const blue40 = blues(40)
    expect(blue40).toBe('hsl(240, 100%, 40%)')
  })

  it('defaults the return value of getter to base color if no key is passed', () => {
    const blues = palette('blue')
    const justBlue = blues()
    expect(justBlue).toBe('blue')
  })

  it('supports a custom color mapping function', () => {
    const fooMapper = jest.fn().mockReturnValue('foobar')
    const foo = palette('blue', fooMapper)
    const foobar = foo('bar')
    expect(fooMapper).toHaveBeenCalledWith('blue', 'bar')
    expect(foobar).toBe('foobar')
  })

  it('caches the generated color by default', () => {
    const fooMapper = jest.fn().mockReturnValue('foobar')
    const foo = palette('blue', fooMapper)
    const foobar = foo('bar')
    const foobarToo = foo('bar')
    expect(fooMapper).toHaveBeenCalledTimes(1)
    expect(foobar).toEqual(foobarToo)
  })

  it('provides the option to disable caching', () => {
    const fooMapper = jest.fn().mockReturnValue('foobar')
    const foo = palette('blue', fooMapper, true)
    const foobar = foo('bar')
    const foobarToo = foo('bar')
    expect(fooMapper).toHaveBeenCalledTimes(2)
    expect(foobar).toEqual(foobarToo)
  })
})
