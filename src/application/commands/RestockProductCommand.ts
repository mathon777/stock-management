import { ProductRepository } from "../../domain/repositories/ProductRepository";

export class RestockProductCommand {
  constructor(private productRepository: ProductRepository) {}
  async execute(id: string) {
    const product = await this.productRepository.findByIdOrThrow(id);
    product.restock();
    await this.productRepository.restock(product.getId());
  }
}
