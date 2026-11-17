import { MapperFactory } from "../MapperFactory";
import { RepositoryFactory } from "../RepositoryFactory";
import { ItemCategory } from "../../enums/ItemCategory";
import { CakeMapper } from "../../mappers/CakeMapper";
import { BookMapper } from "../../mappers/BookMapper";
import { ToyMapper } from "../../mappers/ToyMapper";
import { CakeRepository } from "../../repositories/CakeRepository";
import { BookRepository } from "../../repositories/BookRepository";
import { ToyRepository } from "../../repositories/ToyRepository";

describe("Factory Patterns", () => {
  describe("MapperFactory", () => {
    it("should create the correct mapper instances", () => {
      expect(MapperFactory.createMapper(ItemCategory.CAKE)).toBeInstanceOf(
        CakeMapper,
      );
      expect(MapperFactory.createMapper(ItemCategory.BOOK)).toBeInstanceOf(
        BookMapper,
      );
      expect(MapperFactory.createMapper(ItemCategory.TOY)).toBeInstanceOf(
        ToyMapper,
      );
    });

    it("should throw an error for unsupported categories", () => {
      expect(() =>
        MapperFactory.createMapper("UNKNOWN" as ItemCategory),
      ).toThrow("Unsupported mapper category: UNKNOWN");
    });
  });

  describe("RepositoryFactory", () => {
    it("should create the correct repository instances", () => {
      expect(
        RepositoryFactory.createRepository(ItemCategory.CAKE),
      ).toBeInstanceOf(CakeRepository);
      expect(
        RepositoryFactory.createRepository(ItemCategory.BOOK),
      ).toBeInstanceOf(BookRepository);
      expect(
        RepositoryFactory.createRepository(ItemCategory.TOY),
      ).toBeInstanceOf(ToyRepository);
    });

    it("should throw an error for unsupported categories", () => {
      expect(() =>
        RepositoryFactory.createRepository("UNKNOWN" as ItemCategory),
      ).toThrow("Unsupported repository category: UNKNOWN");
    });
  });
});
