export class StringCalculator {
  private delimiters: RegExp = /[,\n]/

  /**
   * This method processes the input string and calls the add method
   * @param input Input to be processed
   * @returns The add method result
   */
  public processInput (input: string): number {
    if (input === '') return 0
    if (input.startsWith('//')) {
      this.updateDelimiters(input.replace('//', '').split('\n')[0])
      input = input.split('\n')[1]
    }
    if (this.checkNegatives(input)) throw new Error('negatives not allowed')
    return this.add(input)
  }

  /**
   * Recursive method that sums the numbers in the input string
   * @param input Input that contains the numbers to be added
   * @returns The sum of the numbers in the input string
   */
  private add (input: string): number {
    const numbers = input.split(this.delimiters)
    if (this.checkInvalidCases(numbers[0])) numbers[0] = '0'

    // base case
    if (numbers.length <= 1) return parseInt(numbers[0])
    // recursive case
    const [first, ...rest] = numbers
    return parseInt(first) + this.add(rest.join(','))
  }

  /**
   * This method checks if there are negative numbers in the input string
   * @param numbers String that contains the numbers to be checked
   * @returns If there are negative numbers in the input string
   */
  private checkNegatives (numbers: string): boolean {
    if (!numbers.includes('-')) return false

    if (numbers[0] === '-') return true
    else if (numbers.includes('-') && this.delimiters.source.indexOf('-') === -1) return true
    else if (numbers.includes('-') && numbers.match(this.regexForMinusDelimiter())) return true
    return false
  }

  /**
   * This method ignores specific cases and returns true if the input is invalid
   * @param number String to be checked
   * @returns If the input is invalid
   */
  private checkInvalidCases (number: string): boolean {
    if (parseInt(number) > 1000 || number.match(/[a-zA-Z]/)) return true
    if (isNaN(parseInt(number))) throw new Error('invalid syntax')
    return false
  }

  /**
   * This method updates the delimiters attribute
   * @param input Input that contains the delimiters
   */
  private updateDelimiters (input: string): void {
    if (input.length === 1) {
      this.delimiters = new RegExp(`[,]|[\\n]|[${this.escapeRegExp(input)}]`)
      return
    }

    const delimiters = input.replaceAll('[', ' ').replaceAll(']', '')
    const delimitersRegExp = delimiters.replace(/([^\s]{1})/g, '[$1]')
    const escapedDelimiters = '[,]|[\\n]' + this.escapeRegExp(delimitersRegExp).replaceAll(' ', '|')
    this.delimiters = new RegExp(escapedDelimiters)
  }

  /**
   * This method returns a regex that matches the '-' delimiter
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
