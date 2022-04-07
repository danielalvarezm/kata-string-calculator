export class StringCalculator {
  private delimiters: RegExp = /[,\n]/

  public processInput (input: string): number {
    if (input === '') return 0

    if (input.startsWith('//')) {
      this.updateDelimiters(input)
      input = input.split('\n')[1]
    }

    if (this.checkNegatives(input)) throw new Error('negatives not allowed')

    return this.add(input)
  }

  private add (input: string): number {
    const numbers = input.split(this.delimiters)

    if (parseInt(numbers[0]) > 1000) numbers[0] = '0'

    // base case
    if (numbers.length <= 1) return parseInt(numbers[0])

    // recursive case
    const [first, ...rest] = numbers
    return parseInt(first) + this.add(rest.join(','))
  }

  private checkNegatives (numbers: string): boolean {
    if (numbers[0] === '-') return true
    if (numbers.includes('-') && this.delimiters.source.indexOf('-') === -1) return true
    if (numbers.includes('--')) return true
    return false
  }

  private updateDelimiters (input: string): void {
    const delimiters = input.replace('//', '').split('\n')[0]
    this.delimiters = new RegExp(`[,${delimiters}]`)
  }
}
