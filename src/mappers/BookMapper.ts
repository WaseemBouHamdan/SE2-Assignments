import { IMapper } from "./IMapper";
import { Book, BookBuilder } from "../models/Book";

export type MapperInput = string[] | Record<string, string>;

export class BookMapper implements IMapper<MapperInput, Book> {
  map(data: MapperInput): Book {
    const builder = new BookBuilder();

    if (Array.isArray(data)) {
      return builder
<<<<<<< HEAD
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
=======
        .setTitle(data[1])
        .setAuthor(data[2])
        .setPages(parseInt(data[3], 10))
        .setIsbn(data[4] || "")
        .build();
    } else if (typeof data === "object" && data !== null) {
      // JSON format mapping to actual file keys
      return builder
        .setTitle(data["Book Title"] || data.title)
        .setAuthor(data["Author"] || data.author)
        .setPages(parseInt(data["Pages"] || data.pages || "0", 10))
        .setIsbn(data["Genre"] || data.isbn || "")
>>>>>>> 4c5dce4db941360fdf98c00ebe4724733b88085f
        .build();
    }

    throw new Error("Invalid data format provided to Mapper");
  }

  reverseMap(data: Book): Record<string, unknown> {
    return {
      "Book Title": data.getTitle(),
      Author: data.getAuthor(),
<<<<<<< HEAD
      Genre: data.getGenre(),
      Format: data.getFormat(),
=======
      Pages: data.getPages(),
      // Reversing the mapped field
      Genre: data.getIsbn(),
>>>>>>> 4c5dce4db941360fdf98c00ebe4724733b88085f
    };
  }
}
