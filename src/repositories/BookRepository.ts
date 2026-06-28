import { IRepository } from "./IRepository";
import { Book } from "../models/Book";
import { MapperFactory } from "../factories/MapperFactory";
import { ItemCategory } from "../enums/ItemCategory";
import { pool } from "../database/db";
import { IMapper } from "../mappers/IMapper";

export class BookRepository implements IRepository<Book> {
  // Centralized instantiation via MapperFactory
  private mapper = MapperFactory.createMapper(ItemCategory.BOOK) as IMapper<
    any,
    Book
  >;
  async load(): Promise<Book[]> {
    const { rows } = await pool.query("SELECT * FROM books");
    return rows.map((row) => this.mapper.map(row) as Book);
  }

  async save(book: Book): Promise<void> {
    const data = this.mapper.reverseMap(book);
    await pool.query(
      "INSERT INTO books (id, title, author, pages, isbn) VALUES ($1, $2, $3, $4, $5)",
      [data.id, data.title, data.author, data.pages, data.isbn],
    );
  }

  async update(id: string, book: Book): Promise<void> {
    const data = this.mapper.reverseMap(book);
    await pool.query(
      "UPDATE books SET title=$1, author=$2, pages=$3, isbn=$4 WHERE id=$5",
      [data.title, data.author, data.pages, data.isbn, id],
    );
  }

  async delete(id: string): Promise<void> {
    await pool.query("DELETE FROM books WHERE id = $1", [id]);
  }
}
