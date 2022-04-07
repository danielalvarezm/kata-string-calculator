export class StringCalculator {
  private delimiters: RegExp = /[,\n]/
  private negativeDelimiterLength: number = 0

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
    if (this.clearInvalidCases(numbers[0])) numbers[0] = '0'

    // base case
    if (numbers.length <= 1) return parseInt(numbers[0])
    // recursive case
    const [first, ...rest] = numbers
    return parseInt(first) + this.add(rest.join(','))
  }

  private clearInvalidCases (number: string): boolean {
    if (parseInt(number) > 1000 || number === '') return true
    return false
  }

  private checkNegatives (numbers: string): boolean {
    if (!numbers.includes('-')) return false

    const regexForNegatives = new RegExp(`-${'{' + (this.negativeDelimiterLength + 1) + '}'}`, 'g')
    if (numbers[0] === '-') return true
    else if (numbers.includes('-') && this.delimiters.source.indexOf('-') === -1) return true
    else if (numbers.includes('-') && numbers.match(regexForNegatives)) return true // Check for negatives in delimiters
    return false
  }

  private updateDelimiters (input: string): void {
    const delimiters = input.split('\n')[0]
    if (delimiters.includes('-')) {
      this.negativeDelimiterLength = delimiters.lastIndexOf('-') - delimiters.indexOf('-') + 1
    }
    const escapedDelimiters = this.escapeRegExp(delimiters)
    const regex = new RegExp(`[,${escapedDelimiters.replaceAll('[', '|').replaceAll(']', '')}]`, 'g')
    this.delimiters = regex
  }

  private escapeRegExp (delimiters: string): string {
    return delimiters.replace(/[.*+\-?^${}()|\\]/g, '\\$&')
  }
}
