import { Order } from "../models/Order";
import { IdentityFactory } from "./IdentityFactory";

interface OrderFactoryInput {
  id?: string;
  customerId: string;
}

export class OrderFactory {
  static create(input: OrderFactoryInput): Order {
    let id = input.id;
    if (!id) {
      id = IdentityFactory.create();
    }

    return new Order(input.customerId, id);
  }
}
