import { Item, ItemCategory } from "./Item";

export class Book implements Item {
  private title: string;
  private author: string;
  private pages: number;
  private isbn: string;
  private price: number;
  private quantity: number;

  constructor(
    title: string,
    author: string,
    pages: number,
    isbn: string,
    price: number = 0,
    quantity: number = 1,
  ) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isbn = isbn;
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
  getPages(): number {
    return this.pages;
  }
  getIsbn(): string {
    return this.isbn;
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
  private pages?: number;
  private isbn?: string;
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

  setPages(pages: number): BookBuilder {
    this.pages = pages;
    return this;
  }

  setIsbn(isbn: string): BookBuilder {
    this.isbn = isbn;
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
    if (!this.title || !this.author || this.pages === undefined || !this.isbn) {
      throw new Error("Missing required fields to build Book");
    }
    return new Book(
      this.title,
      this.author,
      this.pages,
      this.isbn,
      this.price,
      this.quantity,
    );
  }
}
