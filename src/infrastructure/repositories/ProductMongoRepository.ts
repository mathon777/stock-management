import { ProductRepository } from "../../domain/repositories/ProductRepository";
import { Product, ProductPersistent } from "../../domain/models/Product"; // Assuming you have a Product model
import { ClientSession, MongoClient, ObjectId } from "mongodb";
import { UnitOfWork } from "../../domain/repositories/UnitOfWork";
import { ProductFactory } from "../../domain/factories/ProductFactory";

export class ProductMongoRepository implements ProductRepository {
  private client: MongoClient;
  private collectionName: string;

  constructor(client: MongoClient, collectionName: string = "products") {
    this.client = client;
    this.collectionName = collectionName;
  }

  private get collection() {
    return this.client.db().collection(this.collectionName);
  }

  async save(product: ProductPersistent): Promise<void> {
    const productDocument = {
      _id: new ObjectId(product.id),
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
    };

    await this.collection.updateOne(
      { _id: new ObjectId(product.id) },
      { $set: productDocument },
      { upsert: true },
    );
  }

  async getAll(): Promise<Product[]> {
    const products = await this.collection.find().toArray();

    return products.map((p) =>
      ProductFactory.create({
        id: p._id.toHexString(),
        name: p.name,
        description: p.description,
        price: p.price,
        stock: p.stock,
      }),
    );
  }

  async findByIdOrThrow(id: string): Promise<Product> {
    const product = await this.collection.findOne({ _id: new ObjectId(id) });
    if (!product) {
      throw new Error(`Product with ID ${id} not found.`);
    }
    return ProductFactory.create({
      id: product._id.toHexString(),
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
    });
  }

  async restock(id: string): Promise<void> {
    await this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $inc: { stock: 1 } },
    );
  }

  async sell(id: string, unitOfWork: UnitOfWork<ClientSession>): Promise<void> {
    const session = unitOfWork ? unitOfWork.getSession() : undefined;
    await this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $inc: { stock: -1 } },
      { session },
    );
  }
}
