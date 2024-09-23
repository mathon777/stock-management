import { validate } from "class-validator";
import { IdParamInputDTO } from "../dtos/IdParamInputDTO";

export class IdParamValidator {
  static async validate(idParamInputDTO: IdParamInputDTO) {
    const errors = await validate(idParamInputDTO);
    if (errors.length > 0) {
      const messages = errors.map((err) =>
        Object.values(err.constraints!).join(", "),
      );
      throw new Error(messages.join(", "));
    }
  }
}
