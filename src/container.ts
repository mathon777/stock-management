import {
  asClass,
  asFunction,
  asValue,
  createContainer,
  InjectionMode,
} from "awilix";
import { ProductInMemoryRepository } from "./infrastructure/repositories/ProductInMemoryRepository";
import { CreateProductCommand } from "./application/commands/CreateProductCommand";
import { GetProductsQuery } from "./application/queries/GetProductsQuery";
import { RestockProductCommand } from "./application/commands/RestockProductCommand";
import { SellProductCommand } from "./application/commands/SellProductCommand";
import { ProductController } from "./api/controllers/ProductController";
import { CreateOrderCommand } from "./application/commands/CreateOrderCommand";
import { OrderController } from "./api/controllers/OrderController";
import { OrderInMemoryRepository } from "./infrastructure/repositories/OrderInMemoryRepository";
import { InMemoryUnitOfWork } from "./infrastructure/repositories/InMemoryUnitOfWork";
import { mongoClient } from "./infrastructure/mongo/mongoClient";
import { ProductMongoRepository } from "./infrastructure/repositories/ProductMongoRepository";
import { ProductRepository } from "./domain/repositories/ProductRepository";
import { OrderRepository } from "./domain/repositories/OrderRepository";
import { OrderMongoRepository } from "./infrastructure/repositories/OrderMongoRepository";

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});

const isTest = process.env.NODE_ENV === "test";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T> = new (...args: any[]) => T;

const productRepositoryConstructor: Constructor<ProductRepository> = isTest
  ? ProductInMemoryRepository
  : ProductMongoRepository;

const orderRepositoryConstructor: Constructor<OrderRepository> = isTest
  ? OrderInMemoryRepository
  : OrderMongoRepository;

async function setupContainer() {
  const dbClient = isTest
    ? {}
    : {
        client: asValue(await mongoClient()),
      };

  container.register({
    ...dbClient,

    // REPOSITORIES
    productRepository: asClass(productRepositoryConstructor).singleton(),
    orderRepository: asClass(orderRepositoryConstructor).singleton(),
    unitOfWork: asClass(InMemoryUnitOfWork).singleton(),

    // COMMANDS
    createProductCommand: asClass(CreateProductCommand),
    restockProductCommand: asClass(RestockProductCommand),
    sellProductCommand: asClass(SellProductCommand),
    createOrderCommand: asClass(CreateOrderCommand),

    //QUERIES
    getProductsQuery: asClass(GetProductsQuery),

    // CONTROLLERS
    productController: asClass(ProductController).singleton(),
    orderController: asClass(OrderController).singleton(),
  });

  return container;
}

export { setupContainer, container };
