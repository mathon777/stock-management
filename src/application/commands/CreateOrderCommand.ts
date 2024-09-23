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

    try {
      const order = OrderFactory.create({
        customerId: orderInputDTO.customerId,
      });

      await Promise.all(
        orderInputDTO.products.map(async (productId) => {
          const product =
            await this.productRepository.findByIdOrThrow(productId);

          product.sell();
          order.addOrderItem(product.getId(), product.getPriceValue());
        }),
      );

      await Promise.all(
        orderInputDTO.products.map(async (productId) =>
          this.productRepository.sell(productId, this.unitOfWork),
        ),
      );

      await this.orderRepository.save(order.toPersistent(), this.unitOfWork);

      await this.unitOfWork.commit();
    } catch (error) {
      await this.unitOfWork.rollback();
      throw error;
    }
  }
}
