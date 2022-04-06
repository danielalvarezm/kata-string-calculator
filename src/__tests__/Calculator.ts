import { Calculator } from '../Calculator'

/**
 * TODO: Test cases
 * * add('1') -> 1
 * * add('') -> 0
 */

describe('The kata String Calculator should', () => {
  it('give as result the same number', () => {
    const calculator = new Calculator()

    expect(calculator.add('1')).toBe(1)
    expect(calculator.add('5')).toBe(5)
    expect(calculator.add('10')).toBe(10)
  })

  it('give zero if receive an empty string', () => {
    const calculator = new Calculator()

    expect(calculator.add('')).toBe(0)
  })
})
