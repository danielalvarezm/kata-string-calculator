export class StringCalculator {
  /**
   * This method processes the input string and calls the sum method
   * @param rawInput Input to be processed
   * @returns The sum method result
   */
  public processRawInputReturnSum (rawInput: string): number {
    const input: number[] = this.processRawInput(rawInput)
    return this.sum(input)
  }

  /**
   * This method calls the processDelimiter method and separates the input string into an array of numbers
   * @param rawInput Input to be processed
   * @returns array of numbers with the delimiters removed
   */
  private processRawInput (rawInput: string): number[] {
    const [delimiter, input] = this.processDelimiter(rawInput)
    const inputSplitted = input.split(delimiter)
    return inputSplitted
      .map((element) => parseInt(element))
      .filter((element) => !isNaN(element))
  }

  /**
   * This method sums the array of numbers
   * @param input Array of numbers to be summed
   * @returns The sum of the array of numbers
   */
  private sum (input: number[]): number {
    const defaultValue = 0
    if (input.some((element) => element < 0)) {
      throw new Error('Negatives not allowed')
    }
    return input.reduce((accumulator, currentValue) => {
      if (currentValue <= 1000) {
        accumulator += currentValue
      }
      return accumulator
    }, defaultValue)
  }

  /**
   * With this method, we obtain all the delimiters in the input string
   * @param rawInput Input to be processed
   * @returns The delimiters and the input string without the beggining (//...\n)
   */
  private processDelimiter (rawInput: string): [RegExp, string] {
    let delimiter: RegExp = /[,\n]/

    if (rawInput.startsWith('//')) {
      let rawDelimiter: string = rawInput.substring(2, rawInput.indexOf('\n'))
      rawDelimiter = this.escapeRegExp(rawDelimiter)
      delimiter = new RegExp(`[${rawDelimiter}]`)

      if (rawDelimiter.includes('[')) {
        const delimiters: string[] = rawDelimiter
          .split('[')
          .map((element) => element.replace(']', ''))
        delimiter = new RegExp(`[${delimiters.join('')}]`)
      }

      rawInput = rawInput.slice(rawInput.indexOf('\n'))
    }

    return [delimiter, rawInput]
  }

  /**
   * This method escapes special characters in a string
   * @param delimiters Delimiters to be escaped
   * @returns Delimiters with special characters escaped
   */
  private escapeRegExp (delimiters: string) {
    return delimiters.replace(/[.*+\-?^${}()|\\]/g, '\\$&') // $& significa toda la cadena coincidente
  }
}
