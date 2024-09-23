export class Stock {
  private readonly value: number;

  constructor(value: number) {
    if (value < 0) {
      throw new Error("Stock cannot be negative.");
    }
    this.value = value;
  }

  getValue(): number {
    return this.value;
  }

  increase(amount: number): Stock {
    if (amount <= 0) {
      throw new Error("Restock amount must be a positive number.");
    }
    return new Stock(this.value + amount);
  }

  decrease(amount: number): Stock {
    if (this.value - amount < 0) {
      throw new Error("Insufficient stock.");
    }
    return new Stock(this.value - amount);
  }
}
