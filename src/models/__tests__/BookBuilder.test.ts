import { BookBuilder } from "../Book";

describe("BookBuilder", () => {
  it("should successfully build a Book when all properties are set", () => {
    const book = new BookBuilder()
      .setTitle("Clean Code")
      .setAuthor("Robert C. Martin")
      .setPages(464)
      .setIsbn("978-0132350884")
      .build();

    expect(book.getTitle()).toBe("Clean Code");
    expect(book.getAuthor()).toBe("Robert C. Martin");
    expect(book.getPages()).toBe(464);
    expect(book.getIsbn()).toBe("978-0132350884");
  });

  it("should throw an error if required fields are missing", () => {
    const incompleteBuilder = new BookBuilder().setTitle("Clean Code");

    expect(() => incompleteBuilder.build()).toThrow(
      "Missing required fields to build Book",
    );
  });
});
