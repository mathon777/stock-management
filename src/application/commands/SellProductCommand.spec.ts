import { ProductInputDTO } from "../dtos/ProductInputDTO";
import { container, setupContainer } from "../../container";
import { ProductRepository } from "../../domain/repositories/ProductRepository";
import { ProductFactory } from "../../domain/factories/ProductFactory";
import { SellProductCommand } from "./SellProductCommand";

describe("SellProductCommand", () => {
  let sellProductCommand: SellProductCommand;
  let productRepository: ProductRepository;

  beforeAll(async () => {
    await setupContainer();

    productRepository =
      container.resolve<ProductRepository>("productRepository");
    sellProductCommand =
      container.resolve<SellProductCommand>("sellProductCommand");
  });

  it("should decrease product stock by 1", async () => {
    const productDTO: ProductInputDTO = {
      name: "Test Product",
      description: "Test Description",
      price: 100,
      stock: 10,
    };

    const product = ProductFactory.create(productDTO);
    const productId = product.getId();
    expect(productId).toBeTruthy();
    await productRepository.save(product.toPersistent());

    await sellProductCommand.execute(productId);

    const savedProduct = (
      await productRepository.findByIdOrThrow(productId)
    ).toDTO();
    expect(savedProduct.stock).toBe(9);
  });
});
