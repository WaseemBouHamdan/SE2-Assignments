import { IRepository } from "../repositories/IRepository";
import { CakeRepository } from "../repositories/CakeRepository";
import { BookRepository } from "../repositories/BookRepository";
import { ToyRepository } from "../repositories/ToyRepository";
import { ItemCategory } from "../enums/ItemCategory";
import { Cake } from "../models/Cake";
import { Book } from "../models/Book";
import { Toy } from "../models/Toy";

export class RepositoryFactory {
  public static createRepository(
    category: ItemCategory,
  ): IRepository<Cake | Book | Toy> {
    switch (category) {
      case ItemCategory.CAKE:
        return new CakeRepository();
      case ItemCategory.BOOK:
        return new BookRepository();
      case ItemCategory.TOY:
        return new ToyRepository();
      default:
        throw new Error(`Unsupported repository category: ${category}`);
    }
  }
}
