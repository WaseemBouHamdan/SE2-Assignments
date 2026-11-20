import { Item, ItemCategory } from "./Item";

export class Book implements Item {
  private title: string;
  private author: string;
  private genre: string;
  private format: string;
  private price: number;
  private quantity: number;

  constructor(
    title: string,
    author: string,
    genre: string,
    format: string,
    price: number = 0,
    quantity: number = 1,
  ) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.format = format;
    this.price = price;
    this.quantity = quantity;
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
  getPrice(): number {
    return this.price;
  }
  getQuantity(): number {
    return this.quantity;
  }
}

export class BookBuilder {
  private title?: string;
  private author?: string;
  private genre?: string;
  private format?: string;
  private price: number = 0;
  private quantity: number = 1;

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

  setPrice(price: number): BookBuilder {
    this.price = price;
    return this;
  }

  setQuantity(quantity: number): BookBuilder {
    this.quantity = quantity;
    return this;
  }

  build(): Book {
    if (!this.title || !this.author || !this.genre || !this.format) {
      throw new Error("Missing required fields to build Book");
    }
    return new Book(
      this.title,
      this.author,
      this.genre,
      this.format,
      this.price,
      this.quantity,
    );
  }
}
