/**
 * TODO: Añadir documentación al código
 */
export class StringCalculator {
  private delimiters: RegExp = /[,\n]/

  public processInput (input: string): number {
    if (input === '') return 0
    if (input.startsWith('//')) {
      this.updateDelimiters(input.replace('//', '').split('\n')[0])
      input = input.split('\n')[1]
    }
    if (this.checkNegatives(input)) throw new Error('negatives not allowed')
    return this.add(input)
  }

  private add (input: string): number {
    const numbers = input.split(this.delimiters)
    if (this.clearInvalidCases(numbers[0])) numbers[0] = '0'
    if (isNaN(parseInt(numbers[0]))) throw new Error('invalid syntax')

    // base case
    if (numbers.length <= 1) return parseInt(numbers[0])
    // recursive case
    const [first, ...rest] = numbers
    return parseInt(first) + this.add(rest.join(','))
  }

  private checkNegatives (numbers: string): boolean {
    if (!numbers.includes('-')) return false
    if (numbers[0] === '-') return true
    else if (numbers.includes('-') && this.delimiters.source.indexOf('-') === -1) return true
    else if (numbers.includes('-') && numbers.match(this.regexForNegatives())) return true
    return false
  }

  private clearInvalidCases (number: string): boolean {
    if (parseInt(number) > 1000 || number.match(/[a-zA-Z]/)) return true
    return false
  }

  private updateDelimiters (input: string): void {
    if (input.length === 1) {
      this.delimiters = new RegExp(`[,]|[${this.escapeRegExp(input)}]`)
      return
    }

    const delimiters = input.replaceAll('[', ' ').replaceAll(']', '')
    const delimitersRegExp = delimiters.replace(/([^\s]{1})/g, '[$1]')
    const aux = '[,]|[\\n]' + this.escapeRegExp(delimitersRegExp).replaceAll(' ', '|')
    this.delimiters = new RegExp(aux)
  }

  private regexForNegatives (): RegExp {
    const negativeDelimiterLength = this.delimiters.source.match(/[-]/g)!.length + 1
    return new RegExp(`-${'{' + (negativeDelimiterLength) + '}'}`, 'g')
  }

  private escapeRegExp (delimiters: string): string {
    return delimiters.replace(/[.*+\-?^${}()|\\]/g, '\\$&')
  }
}
