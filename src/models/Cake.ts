import { Item, ItemCategory } from "./Item";

export class Cake implements Item {
  private type: string;
  private flavor: string;
  private filling: string;
  private size: number;
  private price: number;
  private quantity: number;

  constructor(
    type: string,
    flavor: string,
    filling: string,
    size: number,
    price: number = 0,
    quantity: number = 1,
  ) {
    this.type = type;
    this.flavor = flavor;
    this.filling = filling;
    this.size = size;
    this.price = price;
    this.quantity = quantity;
  }

  getCategory(): ItemCategory {
    return ItemCategory.CAKE;
  }
  getType(): string {
    return this.type;
  }
  getFlavor(): string {
    return this.flavor;
  }
  getFilling(): string {
    return this.filling;
  }
  getSize(): number {
    return this.size;
  }
  getPrice(): number {
    return this.price;
  }
  getQuantity(): number {
    return this.quantity;
  }
}

export class CakeBuilder {
  private type?: string;
  private flavor?: string;
  private filling?: string;
  private size?: number;
  private price: number = 0;
  private quantity: number = 1;

  setType(type: string): CakeBuilder {
    this.type = type;
    return this;
  }

  setFlavor(flavor: string): CakeBuilder {
    this.flavor = flavor;
    return this;
  }

  setFilling(filling: string): CakeBuilder {
    this.filling = filling;
    return this;
  }

  setSize(size: number): CakeBuilder {
    this.size = size;
    return this;
  }

  setPrice(price: number): CakeBuilder {
    this.price = price;
    return this;
  }

  setQuantity(quantity: number): CakeBuilder {
    this.quantity = quantity;
    return this;
  }

  build(): Cake {
    if (
      !this.type ||
      !this.flavor ||
      !this.filling ||
      this.size === undefined
    ) {
      throw new Error("Missing required fields to build Cake");
    }
    return new Cake(
      this.type,
      this.flavor,
      this.filling,
      this.size,
      this.price,
      this.quantity,
    );
  }
}
