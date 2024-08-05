import { Price } from "../value-objects/Price";
import { Stock } from "../value-objects/Stock";
import { Product } from "../models/Product";
import { IdentityFactory } from "./IdentityFactory";

interface ProductFactoryInput {
  id?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export class ProductFactory {
  static create(input: ProductFactoryInput): Product {
    const { name, description, price: priceValue, stock: stockValue } = input;

    let id = input.id;

    if (!id) {
      id = IdentityFactory.create();
    }

    const price = new Price(priceValue);
    const stock = new Stock(stockValue);

    return new Product(id, name, description, price, stock);
  }
}
