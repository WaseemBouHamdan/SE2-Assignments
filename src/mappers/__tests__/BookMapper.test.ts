import { BookMapper } from "../BookMapper";

describe("BookMapper", () => {
  const mapper = new BookMapper();

  it("should map CSV array to a Book object", () => {
    const csvData = ["1", "1984", "George Orwell", "328", "978-0451524935"];
    const book = mapper.map(csvData);
    expect(book.getTitle()).toBe("1984");
    expect(book.getPages()).toBe(328);
  });

  it("should map JSON/XML object to a Book object", () => {
    const jsonData = {
      title: "Dune",
      author: "Frank Herbert",
      pages: "412",
      isbn: "123456789",
    };
    const book = mapper.map(jsonData);
    expect(book.getTitle()).toBe("Dune");
    expect(book.getPages()).toBe(412);
  });

  it("should throw Builder error for missing required fields", () => {
    const malformedData = { title: "Incomplete Book" };
    expect(() => mapper.map(malformedData)).toThrow();
  });
});
