export class StringCalculator {
  private delimiters: RegExp = /[,\n]/

  public processInput (input: string): number {
    if (input === '') return 0

    if (input.startsWith('//')) {
      this.updateDelimiters(input)
      input = input.split('\n')[1]
    }

    return this.add(input)
  }

  private add (input: string): number {
    const numbers = input.split(this.delimiters)

    if (numbers.length <= 1) return parseInt(numbers[0]) // base case
    else { // recursive case
      const [first, ...rest] = numbers
      return parseInt(first) + this.add(rest.join(','))
    }
  }

  private updateDelimiters (input: string): void {
    const delimiters = input.replace('//', '').split('\n')[0]
    this.delimiters = new RegExp(`[,${delimiters}]`)
  }
}
