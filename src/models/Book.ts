import { Item, ItemCategory } from "./Item";

export class Book implements Item {
  private title: string;
  private author: string;
  private genre: string;
  private format: string;

  constructor(title: string, author: string, genre: string, format: string) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.format = format;
  }

  getCategory(): ItemCategory {
    return ItemCategory.BOOK;
  }
  getTitle(): string {
    return this.title;
  }
  getAuthor(): string {
    return this.author;
  }
  getGenre(): string {
    return this.genre;
  }
  getFormat(): string {
    return this.format;
  }
}

export class BookBuilder {
  private title?: string;
  private author?: string;
  private genre?: string;
  private format?: string;

  setTitle(title: string): BookBuilder {
    this.title = title;
    return this;
  }

  setAuthor(author: string): BookBuilder {
    this.author = author;
    return this;
  }

  setGenre(genre: string): BookBuilder {
    this.genre = genre;
    return this;
  }

  setFormat(format: string): BookBuilder {
    this.format = format;
    return this;
  }

  build(): Book {
    if (!this.title || !this.author || !this.genre || !this.format) {
      throw new Error("Missing required fields to build Book");
    }
    return new Book(this.title, this.author, this.genre, this.format);
  }
}
