import { ProductInputDTO } from "../dtos/ProductInputDTO";
import { ProductFactory } from "../../domain/factories/ProductFactory";
import { ProductRepository } from "../../domain/repositories/ProductRepository";

export class CreateProductCommand {
  constructor(private productRepository: ProductRepository) {}
  async execute(ProductDTO: ProductInputDTO) {
    const product = ProductFactory.create(ProductDTO);
    await this.productRepository.save(product.toPersistent());
    return product.getId();
  }
}
