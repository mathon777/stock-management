import { IsArray, IsString } from "class-validator";

export class OrderInputDTO {
  @IsString()
  customerId: string;

  @IsArray()
  @IsString({ each: true })
  products: string[];
}
