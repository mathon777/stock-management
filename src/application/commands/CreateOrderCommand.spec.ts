import { ProductInputDTO } from "../dtos/ProductInputDTO";
import { container, setupContainer } from "../../container";
import { ProductRepository } from "../../domain/repositories/ProductRepository";
import { CreateOrderCommand } from "./CreateOrderCommand";
import { ProductFactory } from "../../domain/factories/ProductFactory";

describe("CreateOrderCommand.ts", () => {
  let createOrderCommand: CreateOrderCommand;
  let productRepository: ProductRepository;

  beforeAll(async () => {
    await setupContainer();

    productRepository =
      container.resolve<ProductRepository>("productRepository");
    createOrderCommand =
      container.resolve<CreateOrderCommand>("createOrderCommand");
  });

  it("during order creation stock of product should be reduced", async () => {
    const productDTO1: ProductInputDTO = {
      name: "Test Product",
      description: "Test Description",
      price: 100,
      stock: 10,
    };

    const product1 = ProductFactory.create(productDTO1);
    const productId1 = product1.getId();

    const productDTO2: ProductInputDTO = {
      name: "Test Product2",
      description: "Test Description2",
      price: 33.23,
      stock: 8,
    };

    const product2 = ProductFactory.create(productDTO2);
    const productId2 = product2.getId();

    await productRepository.save(product1.toPersistent());
    await productRepository.save(product2.toPersistent());

    await createOrderCommand.execute({
      customerId: "test",
      products: [productId1, productId2],
    });

    const savedProduct1 = (
      await productRepository.findByIdOrThrow(productId1)
    ).toDTO();

    console.log(savedProduct1);

    expect(savedProduct1.stock).toBe(9);

    const savedProduct2 = (
      await productRepository.findByIdOrThrow(productId2)
    ).toDTO();

    expect(savedProduct2.stock).toBe(7);
  });
});
