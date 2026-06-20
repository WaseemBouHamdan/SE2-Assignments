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
