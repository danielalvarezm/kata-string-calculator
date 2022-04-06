import { Calculator } from '../Calculator'

/**
 * TODO: Test cases
 * * add('1') -> 1
 * * add('') -> 0
 * * add('1,2') -> 3
 * * add('10,5\n2') -> 17
 * * add('//;\n10;5;2') -> 17
 */

describe('The kata String Calculator should', () => {
  const calculator = new Calculator()

  it('give as result the same number', () => {
    expect(calculator.add('1')).toBe(1)
    expect(calculator.add('5')).toBe(5)
    expect(calculator.add('10')).toBe(10)
  })

  it('give zero if receive an empty string', () => {
    expect(calculator.add('')).toBe(0)
  })

  it('give the sum of two or more numbers delimited by comma', () => {
    expect(calculator.add('1,2')).toBe(3)
    expect(calculator.add('5,10')).toBe(15)
    expect(calculator.add('10,5,2')).toBe(17)
  })

  it('give the sum of two or more numbers delimited by comma or \\n', () => {
    expect(calculator.add('1\n2')).toBe(3)
    expect(calculator.add('10,5\n2')).toBe(17)
  })

  it('give the sum of two or more numbers delimited by an especific delimiter', () => {
    expect(calculator.add('//;\n1;2')).toBe(3)
    expect(calculator.add('//;\n10;5;2')).toBe(17)
  })
})
