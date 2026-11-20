import { BookBuilder } from "../Book"; // Update path if needed

describe("BookBuilder", () => {
  it("should build a Book when all properties are set", () => {
    const book = new BookBuilder()
      .setTitle("Clean Code")
      .setAuthor("Robert C. Martin")
      .setGenre("Programming")
      .setFormat("Hardcover")
      .build();

    expect(book.getTitle()).toBe("Clean Code");
    expect(book.getAuthor()).toBe("Robert C. Martin");
    expect(book.getGenre()).toBe("Programming");
    expect(book.getFormat()).toBe("Hardcover");
  });

  it("should throw an error if required fields are missing", () => {
    const incompleteBuilder = new BookBuilder().setTitle("Clean Code");
    expect(() => incompleteBuilder.build()).toThrow(
      "Missing required fields to build Book",
    );
  });
});
