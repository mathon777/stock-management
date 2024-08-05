import { ProductRepository } from "../../domain/repositories/ProductRepository";

export class SellProductCommand {
  constructor(private productRepository: ProductRepository) {}
  async execute(id: string) {
    const product = await this.productRepository.findByIdOrThrow(id);
    product.sell();
    await this.productRepository.sell(product.getId());
  }
}
