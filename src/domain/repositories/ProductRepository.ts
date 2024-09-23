import { Product, ProductPersistent } from "../models/Product";
import { UnitOfWork } from "./UnitOfWork";

export interface ProductRepository {
  save(product: ProductPersistent): Promise<void>;
  getAll(): Promise<Product[]>;
  findByIdOrThrow(id: string): Promise<Product>;
  restock(id: string): Promise<void>;
  sell(id: string, unitOfWork?: UnitOfWork): Promise<void>;
}
