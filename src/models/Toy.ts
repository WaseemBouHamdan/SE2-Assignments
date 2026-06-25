import { Item, ItemCategory } from "./Item";

export class Toy implements Item {
  private name: string;
  private brand: string;
  private recommendedAge: number;
  private material: string;

  constructor(
    name: string,
    brand: string,
    recommendedAge: number,
    material: string,
  ) {
    this.name = name;
    this.brand = brand;
    this.recommendedAge = recommendedAge;
    this.material = material;
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
}

export class ToyBuilder {
  private name?: string;
  private brand?: string;
  private recommendedAge?: number;
  private material?: string;

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

  build(): Toy {
    if (
      !this.name ||
      !this.brand ||
      this.recommendedAge === undefined ||
      !this.material
    ) {
      throw new Error("Missing required fields to build Toy");
    }
    return new Toy(this.name, this.brand, this.recommendedAge, this.material);
  }
}
