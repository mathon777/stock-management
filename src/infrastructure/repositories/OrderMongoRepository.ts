import { OrderRepository } from "../../domain/repositories/OrderRepository";
import { OrderPersistent } from "../../domain/models/Order";
import { MongoClient, ObjectId, Decimal128, ClientSession } from "mongodb";
import { UnitOfWork } from "../../domain/repositories/UnitOfWork";

export class OrderMongoRepository implements OrderRepository {
  private collectionName: string;

  constructor(
    private client: MongoClient,
    collectionName: string = "orders",
  ) {
    this.collectionName = collectionName;
  }

  private get collection() {
    return this.client.db().collection(this.collectionName);
  }

  async save(
    order: OrderPersistent,
    unitOfWork: UnitOfWork<ClientSession>,
  ): Promise<void> {
    const session = unitOfWork ? unitOfWork.getSession() : undefined;

    const orderDocument = {
      _id: new ObjectId(order.id),
      customerId: order.customerId,
      orderItems: order.orderItems,
      totalAmount: Decimal128.fromString(order.totalAmount.toFixed(2)),
    };

    await this.collection.updateOne(
      { _id: new ObjectId(order.id) },
      { $set: orderDocument },
      { upsert: true, session },
    );
  }
}
