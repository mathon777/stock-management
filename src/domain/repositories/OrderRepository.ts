import { OrderPersistent } from "../models/Order";
import { UnitOfWork } from "./UnitOfWork";

export interface OrderRepository {
  save(order: OrderPersistent, unitOfWork?: UnitOfWork): Promise<void>;
}
