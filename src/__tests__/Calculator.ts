import { Calculator } from '../Calculator'

/**
 * TODO: Test cases
 * * add('1') -> 1
 * * add('5') -> 5
 * * add('10') -> 10
 */

describe('The kata String Calculator should', () => {
  it('give as result the same number', () => {
    const calculator = new Calculator()

    expect(calculator.add('1')).toBe(1)
    expect(calculator.add('5')).toBe(5)
    expect(calculator.add('10')).toBe(10)
  })
})
