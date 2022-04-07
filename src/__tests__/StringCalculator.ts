import { StringCalculator } from '../StringCalculator'

/**
 * TODO: Test cases
 * * processInput('1') -> 1
 * * processInput('') -> 0
 * * processInput('1,2') -> 3
 * * processInput('10,5\n2') -> 17
 * * processInput('//;\n10;5;2') -> 17
 */

describe('The kata String Calculator should', () => {
  let calculator: StringCalculator

  beforeEach(() => {
    calculator = new StringCalculator()
  })

  it('give as result the same number', () => {
    expect(calculator.processInput('1')).toBe(1)
    expect(calculator.processInput('5')).toBe(5)
    expect(calculator.processInput('10')).toBe(10)
  })

  it('give zero if receive an empty string', () => {
    expect(calculator.processInput('')).toBe(0)
  })

  it('give the sum of two or more numbers delimited by comma', () => {
    expect(calculator.processInput('1,2')).toBe(3)
    expect(calculator.processInput('5,10')).toBe(15)
    expect(calculator.processInput('10,5,2')).toBe(17)
  })

  it('give the sum of two or more numbers delimited by comma or \\n', () => {
    expect(calculator.processInput('1\n2')).toBe(3)
    expect(calculator.processInput('10,5\n2')).toBe(17)
  })

  it('give the sum of two or more numbers delimited by an especific delimiter', () => {
    expect(calculator.processInput('//;\n1;2')).toBe(3)
    expect(calculator.processInput('//;\n10;5;2')).toBe(17)
    expect(calculator.processInput('//f\n10f5f2')).toBe(17)
  })

  it('not accept negatives numbers', () => {
    expect(() => calculator.processInput('-1')).toThrowError('negatives not allowed')
    expect(() => calculator.processInput('//;\n-1;2')).toThrowError('negatives not allowed')
    expect(() => calculator.processInput('//-\n1-2--3')).toThrowError('negatives not allowed')
    expect(() => calculator.processInput('//-\n-1-2--3')).toThrowError('negatives not allowed')
  })
})
