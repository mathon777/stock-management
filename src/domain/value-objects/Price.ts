export class Price {
  private readonly value: number;

  constructor(value: number) {
    if (value <= 0) {
      throw new Error("Price must be a positive number.");
    }
    this.value = value;
  }

  getValue(): number {
    return this.value;
  }

  toString(): string {
    return `$${this.value.toFixed(2)}`;
  }
}
