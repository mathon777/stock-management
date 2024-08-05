import { ProductRepository } from "../../domain/repositories/ProductRepository";

export class GetProductsQuery {
  constructor(private productRepository: ProductRepository) {}
  async execute() {
    const products = await this.productRepository.getAll();
    return products.map((product) => product.toDTO());
  }
}
