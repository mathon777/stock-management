import { ProductRepository } from "../../domain/repositories/ProductRepository";
import { Product, ProductPersistent } from "../../domain/models/Product";
import { ProductFactory } from "../../domain/factories/ProductFactory";
import { UnitOfWork } from "../../domain/repositories/UnitOfWork";
import { ClientSession } from "mongodb";

export class ProductInMemoryRepository implements ProductRepository {
  private products: Map<string, ProductPersistent> = new Map();

  async save(product: ProductPersistent): Promise<void> {
    this.products.set(product.id, product);
  }

  async getAll(): Promise<Product[]> {
    return Array.from(this.products.values()).map((product) =>
      ProductFactory.create(product),
    );
  }

  async findByIdOrThrow(id: string): Promise<Product> {
    const product = this.products.get(id);
    if (!product) {
      throw new Error(`Product ${id} not found`);
    }

    return ProductFactory.create(product);
  }

  async restock(id: string): Promise<void> {
    const product = this.products.get(id);
    if (product) {
      this.products.set(id, {
        ...product,
        stock: product.stock + 1,
      });
    }
  }

  async sell(id: string): Promise<void> {
    const product = this.products.get(id);
    if (product) {
      this.products.set(id, {
        ...product,
        stock: product.stock - 1,
      });
    }
  }

  async decreaseProductsQuantitiesOrThrow(ids: string[]): Promise<void> {
    const insufficientStockProducts: string[] = [];

    ids.forEach((id) => {
      const product = this.products.get(id);
      if (product && product.stock <= 0) {
        insufficientStockProducts.push(product?.id);
      }
    });

    if (insufficientStockProducts.length > 0) {
      throw new Error(
        `Insufficient stock for products: ${insufficientStockProducts.join(", ")}`,
      );
    }

    ids.forEach((id) => {
      const product = this.products.get(id);
      if (product) {
        this.products.set(id, {
          ...product,
          stock: product.stock - 1,
        });
      }
    });
  }
}
