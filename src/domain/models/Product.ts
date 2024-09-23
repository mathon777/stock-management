import { Price } from "../value-objects/Price";
import { Stock } from "../value-objects/Stock";

interface ProductDTO {
  id: string;
  name: string;
  description: string;
  price: string;
  stock: number;
}

export interface ProductPersistent {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export class Product {
  private readonly id: string;
  private readonly name: string;
  private readonly description: string;
  private price: Price;
  private stock: Stock;

  constructor(
    id: string,
    name: string,
    description: string,
    price: Price,
    stock: Stock,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
  }

  getId(): string {
    return this.id;
  }

  getPriceValue(): number {
    return this.price.getValue();
  }

  restock(): void {
    this.stock = this.stock.increase(1);
  }

  sell(): void {
    this.stock = this.stock.decrease(1);
  }

  toDTO(): ProductDTO {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price.toString(),
      stock: this.stock.getValue(),
    };
  }

  toPersistent(): ProductPersistent {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price.getValue(),
      stock: this.stock.getValue(),
    };
  }
}
