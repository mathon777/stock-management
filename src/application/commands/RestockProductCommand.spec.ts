import { ProductInputDTO } from "../dtos/ProductInputDTO";
import { container, setupContainer } from '../../container';
import { ProductRepository } from "../../domain/repositories/ProductRepository";
import { RestockProductCommand } from "./RestockProductCommand";
import { ProductFactory } from "../../domain/factories/ProductFactory";

describe("RestockProductCommand", () => {
  let restockProductCommand: RestockProductCommand;
  let productRepository: ProductRepository;

  beforeAll(async () => {
    await setupContainer()

    productRepository = container.resolve<ProductRepository>('productRepository');
    restockProductCommand = container.resolve<RestockProductCommand>('restockProductCommand');
  });

  it("should increase product stock by 1", async () => {
    const productDTO: ProductInputDTO = {
      name: "Test Product",
      description: "Test Description",
      price: 100,
      stock: 10,
    };

    const product = ProductFactory.create(productDTO)
    const productId = product.getId();
    expect(productId).toBeTruthy();
    await productRepository.save(product.toPersistent())

    await restockProductCommand.execute(productId);

    const savedProduct = (await productRepository.findByIdOrThrow(productId)).toDTO();
    expect(savedProduct.stock).toBe(11);
  });
});