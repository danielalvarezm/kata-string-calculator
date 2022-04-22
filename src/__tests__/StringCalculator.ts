import { StringCalculator } from '../StringCalculator'

describe('The kata String Calculator should', () => {
  let stringCalculator: StringCalculator

  beforeEach(() => {
    stringCalculator = new StringCalculator()
  })

  it('give as result the same number', () => {
    expect(stringCalculator.parseInput('1')).toBe(1)
    expect(stringCalculator.parseInput('5')).toBe(5)
    expect(stringCalculator.parseInput('10')).toBe(10)
  })

  it('give zero if receive an empty string', () => {
    expect(stringCalculator.parseInput('')).toBe(0)
  })

  it('give the sum of two or more numbers delimited by comma', () => {
    expect(stringCalculator.parseInput('1,2')).toBe(3)
    expect(stringCalculator.parseInput('5,10')).toBe(15)
    expect(stringCalculator.parseInput('10,5,2')).toBe(17)
  })

  it('give the sum of two or more numbers delimited by comma or \\n', () => {
    expect(stringCalculator.parseInput('1\n2')).toBe(3)
    expect(stringCalculator.parseInput('10,5\n2')).toBe(17)
  })

  it('give the sum of two or more numbers delimited by an especific delimiter', () => {
    expect(stringCalculator.parseInput('//;\n1;2')).toBe(3)
    expect(stringCalculator.parseInput('//;\n10;5;2')).toBe(17)
    expect(stringCalculator.parseInput('//f\n10f5f2')).toBe(17)
  })

  it('not accept negatives numbers', () => {
    expect(() => stringCalculator.parseInput('-1')).toThrowError('negatives not allowed')
    expect(() => stringCalculator.parseInput('//;\n-1;2')).toThrowError('negatives not allowed')
    expect(() => stringCalculator.parseInput('//-\n1-2--3')).toThrowError('negatives not allowed')
    expect(() => stringCalculator.parseInput('//-\n-1-2--3')).toThrowError('negatives not allowed')
  })

  it('ignores numbers bigger than 1000', () => {
    expect(stringCalculator.parseInput('1001')).toBe(0)
    expect(stringCalculator.parseInput('//;\n1001;2')).toBe(2)
    expect(stringCalculator.parseInput('1001,2,3')).toBe(5)
  })

  it('accept a delimiter specified of any length', () => {
    expect(stringCalculator.parseInput('//[;;]\n1;;2')).toBe(3)
    expect(stringCalculator.parseInput('//[***]\n5***1***3')).toBe(9)
    expect(stringCalculator.parseInput('//[--]\n5--1--3')).toBe(9)
    expect(stringCalculator.parseInput('//[||]\n5||1||3')).toBe(9)
  })

  it('accept multiple delimiters specified', () => {
    expect(stringCalculator.parseInput('//[;][*]\n1;1*1')).toBe(3)
    expect(stringCalculator.parseInput('//[;][w]\n5w1;3')).toBe(9)
    expect(stringCalculator.parseInput('//[;][-]\n5-1;3')).toBe(9)
  })

  it('accept multiple delimiters of any length specified', () => {
    expect(stringCalculator.parseInput('//[;;][*]\n1;;1*1')).toBe(3)
    expect(stringCalculator.parseInput('//[;;][ww]\n5ww1;;3')).toBe(9)
    expect(stringCalculator.parseInput('//[;;][--]\n5--1;;3')).toBe(9)
  })

  it('ignore letters', () => {
    expect(stringCalculator.parseInput('//;\n1;aa;2')).toBe(3)
    expect(stringCalculator.parseInput('//[;;][*]\n1;;qwwq;;1*ss*1')).toBe(3)
  })

  it('not accept invalid syntax', () => {
    expect(() => stringCalculator.parseInput('//[***]\n5****1***3')).toThrowError('invalid syntax')
    expect(() => stringCalculator.parseInput('//[;;][*]\n1;;;1*1')).toThrowError('invalid syntax')
  })
})
