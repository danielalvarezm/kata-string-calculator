export class StringCalculator {
  private delimiters: RegExp = /[,\n]/

  /**
   * This method parses the input string and calls the add method
   * * Check for empty string
   * * Check for custom delimiters
   * * Check for negative numbers
   * @param rawExpresion Input to be parsed
   * @returns The add method result
   */
  public parseInput (rawExpresion: string): number {
    let expressionWithoutBeginning = rawExpresion
    if (rawExpresion === '') {
      return 0
    }
    if (rawExpresion.startsWith('//')) {
      this.updateDelimiters(rawExpresion.replace('//', '').split('\n')[0])
      expressionWithoutBeginning = rawExpresion.split('\n')[1]
    }
    if (this.checkNegatives(expressionWithoutBeginning)) {
      throw new Error('negatives not allowed')
    }
    return this.add(expressionWithoutBeginning)
  }

  /**
   * This method updates the "delimiters" attribute
   * @param rawExpression Input that contains the delimiters
   */
  private updateDelimiters (rawExpression: string): void {
    if (rawExpression.length === 1) {
      this.delimiters = new RegExp(`[,]|[\\n]|[${this.escapeRegExp(rawExpression)}]`)
      return
    }

    const delimiters = rawExpression.replaceAll('[', ' ').replaceAll(']', '')
    const delimitersWithBrackets = delimiters.replace(/([^\s]{1})/g, '[$1]')
    const escapedDelimiters = '[,]|[\\n]' + this.escapeRegExp(delimitersWithBrackets).replaceAll(' ', '|')
    this.delimiters = new RegExp(escapedDelimiters)
  }

  /**
   * This method checks if there are negative numbers in the input string
   * @param numbers String that contains the numbers to be checked
   * @returns If there are negative numbers in the input string
   */
  private checkNegatives (numbers: string): boolean {
    if (!numbers.includes('-')) return false

    if (numbers[0] === '-') {
      return true
    } else if (numbers.includes('-') && this.delimiters.source.indexOf('-') === -1) {
      return true
    } else if (numbers.includes('-') && numbers.match(this.regexForMinusDelimiter())) {
      return true
    }
    return false
  }

  /**
   * Recursive method that sums the numbers in the input string
   * @param rawExpression Input that contains the numbers to be added
   * @returns The sum of the numbers in the input string
   */
  private add (rawExpression: string): number {
    const numbers = rawExpression.split(this.delimiters)
    if (this.checkInvalidCases(numbers[0])) {
      numbers[0] = '0'
    }

    // base case
    if (numbers.length <= 1) {
      return parseInt(numbers[0])
    }
    // recursive case
    const [first, ...rest] = numbers
    return parseInt(first) + this.add(rest.join(','))
  }

  /**
   * This method ignores specific cases and returns true if the input is invalid
   * * Number bigger than 1000 should be ignored
   * * Letters should be ignored if they are not delimiters
   * * If the input is not a number, it should be ignored
   * @param number String to be checked
   * @returns If the input is invalid
   */
  private checkInvalidCases (number: string): boolean {
    if (parseInt(number) > 1000 || number.match(/[a-zA-Z]/)) {
      return true
    }
    if (isNaN(parseInt(number))) {
      throw new Error('invalid syntax')
    }
    return false
  }

  /**
   * This method returns a regex that matches the '-' delimiter, when
   * there are negative numbers in the input string
   * @returns The regex expression
   */
  private regexForMinusDelimiter (): RegExp {
    const minusDelimiterLength = this.delimiters.source.match(/[-]/g)!.length + 1
    return new RegExp(`-${'{' + (minusDelimiterLength) + '}'}`, 'g')
  }

  /**
   * This method escapes special characters in a string
   * @param delimiters Delimiters to be escaped
   * @returns Delimiters with special characters escaped
   */
  private escapeRegExp (delimiters: string): string {
    return delimiters.replace(/[.*+\-?^${}()|\\]/g, '\\$&')
  }
}
