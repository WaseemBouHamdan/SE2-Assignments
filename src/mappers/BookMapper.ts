import { IMapper } from "./IMapper";
import { Book, BookBuilder } from "../models/Book";

export type MapperInput = string[] | Record<string, string>;

export class BookMapper implements IMapper<MapperInput, Book> {
  map(data: MapperInput): Book {
    const builder = new BookBuilder();

    if (Array.isArray(data)) {
      return builder
        .setTitle(data[1] || "")
        .setAuthor(data[2] || "")
        .setGenre(data[3] || "")
        .setFormat(data[4] || "")
        .build();
    } else if (typeof data === "object" && data !== null) {
      return builder
        .setTitle(data["Book Title"] || data.title || "")
        .setAuthor(data["Author"] || data.author || "")
        .setGenre(data["Genre"] || data.genre || "")
        .setFormat(data["Format"] || data.format || "")
        .build();
    }

    throw new Error("Invalid data format provided to Mapper");
  }

  reverseMap(data: Book): Record<string, unknown> {
    return {
      "Book Title": data.getTitle(),
      Author: data.getAuthor(),
      Genre: data.getGenre(),
      Format: data.getFormat(),
    };
  }
}
