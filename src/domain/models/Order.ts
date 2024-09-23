import { OrderItem } from "../value-objects/OrderItem";

export interface OrderPersistent {
  id: string;
  customerId: string;
  orderItems: {
    productId: string;
    price: number;
  }[];
  totalAmount: number;
}

export class Order {
  public readonly orderId: string;
  public readonly customerId: string;
  public readonly orderItems: OrderItem[];

  constructor(customerId: string, id: string) {
    this.orderId = id;
    this.customerId = customerId;
    this.orderItems = [];
  }

  getId(): string {
    return this.orderId;
  }

  public addOrderItem(productId: string, price: number): void {
    const orderItem = new OrderItem(productId, price);
    this.orderItems.push(orderItem);
  }

  toPersistent(): OrderPersistent {
    return {
      id: this.orderId,
      customerId: this.customerId,
      orderItems: this.orderItems,
      totalAmount: this.orderItems.reduce((sum, item) => sum + item.price, 0),
    };
  }
}
