import { IMapper } from "./IMapper";
import { Book, BookBuilder } from "../models/Book";

export class BookMapper implements IMapper<any, Book> {
  map(data: any): Book {
    const builder = new BookBuilder();

    if (Array.isArray(data)) {
      // CSV format: [id, title, author, pages, isbn]
      return builder
        .setTitle(data[1])
        .setAuthor(data[2])
        .setPages(parseInt(data[3], 10))
        .setIsbn(data[4])
        .build();
    } else if (typeof data === "object" && data !== null) {
      // JSON/XML format
      return builder
        .setTitle(data.title)
        .setAuthor(data.author)
        .setPages(parseInt(data.pages, 10))
        .setIsbn(data.isbn)
        .build();
    }

    throw new Error("Invalid data format provided to Mapper");
  }

  reverseMap(data: Book): any {
    return {
      title: data.getTitle(),
      author: data.getAuthor(),
      pages: data.getPages(),
      isbn: data.getIsbn(),
    };
  }
}
