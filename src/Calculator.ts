export class Calculator {
  private delimiters: RegExp = /[,]/

  public add (input: string): number {
    if (input === '') return 0
    const numbers = input.split(this.delimiters)

    if (numbers.length <= 1) return parseInt(numbers[0]) // base case
    else { // recursive case
      const [first, ...rest] = numbers
      return parseInt(first) + this.add(rest.join(','))
    }
  }
}
