export class OrderItem {
  public readonly productId: string;
  public readonly price: number;

  constructor(productId: string, price: number) {
    if (price <= 0) {
      throw new Error("Order Item price must be greater than zero");
    }

    this.productId = productId;
    this.price = price;
  }
}
