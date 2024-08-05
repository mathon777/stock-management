import { validate } from "class-validator";
import { ProductInputDTO } from "../dtos/ProductInputDTO";

export class ProductValidator {
  static async validate(product: ProductInputDTO) {
    const errors = await validate(product);
    if (errors.length > 0) {
      const messages = errors.map((err) =>
        Object.values(err.constraints!).join(", "),
      );
      throw new Error(messages.join(", "));
    }
  }
}
