import { IMapper } from "../mappers/IMapper";
import { CakeMapper } from "../mappers/CakeMapper";
import { BookMapper } from "../mappers/BookMapper";
import { ToyMapper } from "../mappers/ToyMapper";
import { ItemCategory } from "../enums/ItemCategory";
import { Cake } from "../models/Cake";
import { Book } from "../models/Book";
import { Toy } from "../models/Toy";

export class MapperFactory {
  public static createMapper(category: ItemCategory.CAKE): IMapper<any, Cake>;
  public static createMapper(category: ItemCategory.BOOK): IMapper<any, Book>;
  public static createMapper(category: ItemCategory.TOY): IMapper<any, Toy>;
  public static createMapper(
    category: ItemCategory,
  ): IMapper<any, Cake> | IMapper<any, Book> | IMapper<any, Toy>;
  public static createMapper(
    category: ItemCategory,
  ): IMapper<any, Cake> | IMapper<any, Book> | IMapper<any, Toy> {
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
