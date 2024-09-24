import { CreateProductCommand } from "./CreateProductCommand";
import { ProductInputDTO } from "../dtos/ProductInputDTO";
import { container, setupContainer } from "../../container";
import { ProductRepository } from "../../domain/repositories/ProductRepository";

describe("CreateProductCommand", () => {
  let createProductCommand: CreateProductCommand;
  let productRepository: ProductRepository;

  beforeAll(async () => {
    await setupContainer();

    productRepository =
      container.resolve<ProductRepository>("productRepository");
    createProductCommand = container.resolve<CreateProductCommand>(
      "createProductCommand",
    );
  });

  it("should create and save a product, then return the product ID", async () => {
    const productDTO: ProductInputDTO = {
      name: "Test Product",
      description: "Test Description",
      price: 100,
      stock: 10,
    };

    const productId = await createProductCommand.execute(productDTO);

    expect(productId).toBeTruthy();

    const savedProduct = (
      await productRepository.findByIdOrThrow(productId)
    ).toDTO();

    expect(savedProduct.name).toBe("Test Product");
    expect(savedProduct.description).toBe("Test Description");
    expect(savedProduct.price).toBe("$100.00");
    expect(savedProduct.stock).toBe(10);
  });
});
