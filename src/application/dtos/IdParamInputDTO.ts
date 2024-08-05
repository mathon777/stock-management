import { IsString } from "class-validator";

export class IdParamInputDTO {
  @IsString()
  id: string;
}
