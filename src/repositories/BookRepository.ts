import { IRepository } from "./IRepository";
import { Book } from "../models/Book";
import { BookMapper } from "../mappers/BookMapper";
import { pool } from "../database/db";

export class BookRepository implements IRepository<Book> {
  private mapper = new BookMapper();

  async load(): Promise<Book[]> {
    const { rows } = await pool.query("SELECT * FROM books");
    return rows.map((row) => this.mapper.map(row));
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
