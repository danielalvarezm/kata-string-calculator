export class StringCalculator {
  // expresion regular para ;; o ,
  private delimiters: RegExp = /[,\n]/
  private delimitersLength: number = 0

  public processInput (input: string): number {
    if (input === '') return 0
    if (input.startsWith('//')) {
      this.updateDelimiters(input.replace('//', ''))
      input = input.split('\n')[1]
    }
    if (this.checkNegatives(input)) throw new Error('negatives not allowed')

    return this.add(input)
  }

  private add (input: string): number {
    const numbers = input.split(this.delimiters)
    if (parseInt(numbers[0]) > 1000 || numbers[0] === '') numbers[0] = '0'

    // base case
    if (numbers.length <= 1) return parseInt(numbers[0])

    // recursive case
    const [first, ...rest] = numbers
    return parseInt(first) + this.add(rest.join(','))
  }

  private checkNegatives (numbers: string): boolean {
    if (numbers[0] === '-') return true
    if (numbers.includes('-') && this.delimiters.source.indexOf('-') === -1) return true

    // Check for negatives in delimiters
    const regex = new RegExp(`-${'{' + (this.delimitersLength + 1) + '}'}`, 'g')
    if (numbers.match(regex)) return true
    return false
  }

  private updateDelimiters (input: string): void {
    const delimiters = input.split('\n')[0]
    this.delimitersLength = (delimiters.length === 1) ? 1 : delimiters.length - 2
    const escapedDelimiters = this.escapeRegExp(delimiters)
    const regex = new RegExp(`[,${escapedDelimiters.replaceAll('[', '|').replaceAll(']', '')}]`, 'g')
    this.delimiters = regex
  }

  private escapeRegExp (delimiters: string): string {
    return delimiters.replace(/[.*+\-?^${}()|\\]/g, '\\$&')
  }
}
