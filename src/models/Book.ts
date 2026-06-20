import { Item, ItemCategory } from "./Item";

export class Book implements Item {
  private title: string;
  private author: string;
  private pages: number;
  private isbn: string;

  constructor(title: string, author: string, pages: number, isbn: string) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isbn = isbn;
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
}
