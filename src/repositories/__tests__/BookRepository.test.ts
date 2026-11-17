import { BookRepository } from "../BookRepository";
import { pool } from "../../database/db";
import { BookBuilder } from "../../models/Book";

jest.mock("../../database/db", () => ({
  pool: { query: jest.fn() },
}));

describe("BookRepository CRUD and Edge Cases", () => {
  let repo: BookRepository;
  const mockBook = new BookBuilder()
    .setTitle("1984")
    .setAuthor("George Orwell")
    .setPages(328)
    .setIsbn("978-0451524935")
    .build();

  beforeEach(() => {
    repo = new BookRepository();
    jest.clearAllMocks();
  });

  it("should successfully load books", async () => {
    const mockRows = [
      {
        id: "1",
        title: "1984",
        author: "George Orwell",
        pages: 328,
        isbn: "978-0451524935",
      },
    ];
    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: mockRows });

    const books = await repo.load();
    expect(pool.query).toHaveBeenCalledWith("SELECT * FROM books");
    expect(books[0].getTitle()).toBe("1984");
  });

  it("should successfully save a book", async () => {
    (pool.query as jest.Mock).mockResolvedValueOnce({});
    await repo.save(mockBook);
    expect(pool.query).toHaveBeenCalledTimes(1);
  });

  it("should handle null values by rejecting invalid saves", async () => {
    (pool.query as jest.Mock).mockRejectedValueOnce(
      new Error("null value constraint"),
    );
    await expect(repo.save(mockBook)).rejects.toThrow("null value constraint");
  });

  it("should handle duplicate entries gracefully", async () => {
    (pool.query as jest.Mock).mockRejectedValueOnce({ code: "23505" });
    await expect(repo.save(mockBook)).rejects.toMatchObject({ code: "23505" });
  });
});
