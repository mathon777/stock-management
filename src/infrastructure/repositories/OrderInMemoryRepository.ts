import { OrderRepository } from "../../domain/repositories/OrderRepository";
import { Order, OrderPersistent } from "../../domain/models/Order";
import { OrderFactory } from "../../domain/factories/OrderFactory";

export class OrderInMemoryRepository implements OrderRepository {
  private orders: Map<string, OrderPersistent> = new Map();

  async save(order: OrderPersistent): Promise<void> {
    this.orders.set(order.id, order);
  }

  async findByIdOrThrow(id: string): Promise<Order> {
    const order = this.orders.get(id);
    if (!order) {
      throw new Error(`Order ${id} not found`);
    }

    return OrderFactory.create(order);
  }
}
