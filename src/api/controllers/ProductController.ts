import { Request, Response } from "express";

import { ProductValidator } from "../../application/validators/ProductValidator";
import { ProductInputDTO } from "../../application/dtos/ProductInputDTO";
import { plainToInstance } from "class-transformer";
import { CreateProductCommand } from "../../application/commands/CreateProductCommand";
import { GetProductsQuery } from "../../application/queries/GetProductsQuery";
import { IdParamInputDTO } from "../../application/dtos/IdParamInputDTO";
import { RestockProductCommand } from "../../application/commands/RestockProductCommand";
import { IdParamValidator } from "../../application/validators/IdParamValidator";
import { SellProductCommand } from "../../application/commands/SellProductCommand";

export class ProductController {
  constructor(
    private createProductCommand: CreateProductCommand,
    private getProductsQuery: GetProductsQuery,
    private restockProductCommand: RestockProductCommand,
    private sellProductCommand: SellProductCommand,
  ) {}
  async createProduct(req: Request, res: Response) {
    const productDTO = plainToInstance(ProductInputDTO, req.body);

    try {
      await ProductValidator.validate(productDTO);

      const productId = await this.createProductCommand.execute(productDTO);

      res
        .status(201)
        .json({ id: productId, message: "Product created successfully" });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      res.status(500);
    }
  }

  async getProducts(req: Request, res: Response) {
    try {
      const products = await this.getProductsQuery.execute();
      res.status(200).json(products);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      res.status(500);
    }
  }

  async restockProduct(req: Request, res: Response) {
    const idParamInputDTO = plainToInstance(IdParamInputDTO, req.params);

    try {
      await IdParamValidator.validate(idParamInputDTO);

      await this.restockProductCommand.execute(idParamInputDTO.id);

      res.status(200).json({ message: "Operation successful" });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      res.status(500);
    }
  }

  async sellProduct(req: Request, res: Response) {
    const idParamInputDTO = plainToInstance(IdParamInputDTO, req.params);

    try {
      await IdParamValidator.validate(idParamInputDTO);

      await this.sellProductCommand.execute(idParamInputDTO.id);

      res.status(200).json({ message: "Operation successful" });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      res.status(500);
    }
  }
}
