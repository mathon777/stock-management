import { validate } from "class-validator";
import { OrderInputDTO } from "../dtos/OrderInputDTO";

export class OrderValidator {
  static async validate(order: OrderInputDTO) {
    const errors = await validate(order);
    if (errors.length > 0) {
      const messages = errors.map((err) =>
        Object.values(err.constraints!).join(", "),
      );
      throw new Error(messages.join(", "));
    }
  }
}
