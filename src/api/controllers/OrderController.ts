import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { CreateOrderCommand } from "../../application/commands/CreateOrderCommand";
import { OrderInputDTO } from "../../application/dtos/OrderInputDTO";
import { OrderValidator } from "../../application/validators/OrderValidator";

export class OrderController {
  constructor(private createOrderCommand: CreateOrderCommand) {}
  async createOrder(req: Request, res: Response) {
    const orderDTO = plainToInstance(OrderInputDTO, req.body);

    try {
      await OrderValidator.validate(orderDTO);

      const productId = await this.createOrderCommand.execute(orderDTO);

      res
        .status(201)
        .json({ id: productId, message: "Order created successfully" });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      res.status(500);
    }
  }
}
