export class StringCalculator {
  public processRawInputReturnSum (rawInput: string): number {
    const input: number[] = this.processRawInput(rawInput)
    return this.sum(input)
  }

  private processRawInput (rawInput: string): number[] {
    const [delimiter, input] = this.processDelimiter(rawInput)
    const inputSplitted = input.split(delimiter)
    return inputSplitted
      .map((element) => parseInt(element))
      .filter((element) => !isNaN(element))
  }

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

  private escapeRegExp (delimiters: string) {
    return delimiters.replace(/[.*+\-?^${}()|\\]/g, '\\$&') // $& significa toda la cadena coincidente
  }
}
