import { OrderRepository } from "../../domain/repositories/OrderRepository";
import { OrderPersistent } from "../../domain/models/Order";

export class OrderInMemoryRepository implements OrderRepository {
  private orders: Map<string, OrderPersistent> = new Map();

  async save(order: OrderPersistent): Promise<void> {
    this.orders.set(order.id, order);
  }
}
