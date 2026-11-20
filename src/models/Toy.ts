import { Item, ItemCategory } from "./Item";

export class Toy implements Item {
  private name: string;
  private brand: string;
  private recommendedAge: number;
  private material: string;
  private price: number;
  private quantity: number;

  constructor(
    name: string,
    brand: string,
    recommendedAge: number,
    material: string,
    price: number = 0,
    quantity: number = 1,
  ) {
    this.name = name;
    this.brand = brand;
    this.recommendedAge = recommendedAge;
    this.material = material;
    this.price = price;
    this.quantity = quantity;
  }

  getCategory(): ItemCategory {
    return ItemCategory.TOY;
  }
  getName(): string {
    return this.name;
  }
  getBrand(): string {
    return this.brand;
  }
  getRecommendedAge(): number {
    return this.recommendedAge;
  }
  getMaterial(): string {
    return this.material;
  }
  getPrice(): number {
    return this.price;
  }
  getQuantity(): number {
    return this.quantity;
  }
}

export class ToyBuilder {
  private name?: string;
  private brand?: string;
  private recommendedAge?: number;
  private material?: string;
  private price: number = 0;
  private quantity: number = 1;

  setName(name: string): ToyBuilder {
    this.name = name;
    return this;
  }

  setBrand(brand: string): ToyBuilder {
    this.brand = brand;
    return this;
  }

  setRecommendedAge(age: number): ToyBuilder {
    this.recommendedAge = age;
    return this;
  }

  setMaterial(material: string): ToyBuilder {
    this.material = material;
    return this;
  }

  setPrice(price: number): ToyBuilder {
    this.price = price;
    return this;
  }

  setQuantity(quantity: number): ToyBuilder {
    this.quantity = quantity;
    return this;
  }

  build(): Toy {
    if (
      !this.name ||
      !this.brand ||
      this.recommendedAge === undefined ||
      !this.material
    ) {
      throw new Error("Missing required fields to build Toy");
    }
    return new Toy(
      this.name,
      this.brand,
      this.recommendedAge,
      this.material,
      this.price,
      this.quantity,
    );
  }
}
