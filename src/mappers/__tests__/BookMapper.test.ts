import { BookMapper } from "../BookMapper";

describe("BookMapper", () => {
  const mapper = new BookMapper();

  it("should map CSV array to a Book object", () => {
    const csvData = ["1", "1984", "George Orwell", "Dystopian", "Paperback"];
    const book = mapper.map(csvData);
    expect(book.getTitle()).toBe("1984");
    expect(book.getGenre()).toBe("Dystopian");
    expect(book.getFormat()).toBe("Paperback");
  });

  it("should map JSON/XML object to a Book object", () => {
    const jsonData = {
      title: "Dune",
      author: "Frank Herbert",
      genre: "Sci-Fi",
      format: "Hardcover",
    };
    const book = mapper.map(jsonData);
    expect(book.getTitle()).toBe("Dune");
    expect(book.getGenre()).toBe("Sci-Fi");
    expect(book.getFormat()).toBe("Hardcover");
  });

  it("should throw Builder error for missing required fields", () => {
    const malformedData = { title: "Incomplete Book" };
    expect(() => mapper.map(malformedData)).toThrow();
  });
});
