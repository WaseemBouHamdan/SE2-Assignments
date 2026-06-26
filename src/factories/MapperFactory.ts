import { IMapper } from "../mappers/IMapper";
import { CakeMapper } from "../mappers/CakeMapper";
import { BookMapper } from "../mappers/BookMapper";
import { ToyMapper } from "../mappers/ToyMapper";
import { ItemCategory } from "../enums/ItemCategory";
import { Cake } from "../models/Cake";
import { Book } from "../models/Book";
import { Toy } from "../models/Toy";

export class MapperFactory {
  public static createMapper(category: ItemCategory) {
    switch (category) {
      case ItemCategory.CAKE:
        return new CakeMapper();
      case ItemCategory.BOOK:
        return new BookMapper();
      case ItemCategory.TOY:
        return new ToyMapper();
      default:
        throw new Error(`Unsupported mapper category: ${category}`);
    }
  }
}
