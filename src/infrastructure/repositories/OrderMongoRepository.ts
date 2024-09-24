import { OrderRepository } from "../../domain/repositories/OrderRepository";
import { Order, OrderPersistent } from "../../domain/models/Order";
import { MongoClient, ObjectId, Decimal128, ClientSession } from "mongodb";
import { UnitOfWork } from "../../domain/repositories/UnitOfWork";
import { OrderFactory } from "../../domain/factories/OrderFactory";

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

  async findByIdOrThrow(id: string): Promise<Order> {
    const order = await this.collection.findOne({ _id: new ObjectId(id) });
    if (!order) {
      throw new Error(`Order with ID ${id} not found.`);
    }
    return OrderFactory.create({
      id: order._id.toHexString(),
      customerId: order.customerId,
    });
  }
}
