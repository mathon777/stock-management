import { OrderRepository } from "../../domain/repositories/OrderRepository";
import { ProductRepository } from "../../domain/repositories/ProductRepository";
import { UnitOfWork } from "../../domain/repositories/UnitOfWork";

import { OrderInputDTO } from "../dtos/OrderInputDTO";
import { OrderFactory } from "../../domain/factories/OrderFactory";

export class CreateOrderCommand {
  constructor(
    private orderRepository: OrderRepository,
    private productRepository: ProductRepository,
    private unitOfWork: UnitOfWork,
  ) {}

  async execute(orderInputDTO: OrderInputDTO): Promise<void> {
    await this.unitOfWork.start();

    const order = OrderFactory.create({
      customerId: orderInputDTO.customerId,
    });

    try {
      await this.productRepository.decreaseProductsQuantitiesOrThrow(
        orderInputDTO.products,
        this.unitOfWork,
      );

      await this.orderRepository.save(order.toPersistent(), this.unitOfWork);

      await this.unitOfWork.commit();
    } catch (error) {
      await this.unitOfWork.rollback();
      throw error;
    }
  }
}
