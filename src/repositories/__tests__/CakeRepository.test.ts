import { CakeRepository } from "../CakeRepository";
import { pool } from "../../database/db";
import { CakeBuilder } from "../../models/Cake";

jest.mock("../../database/db", () => ({
  pool: { query: jest.fn() },
}));

describe("CakeRepository CRUD and Edge Cases", () => {
  let repo: CakeRepository;
  const mockCake = new CakeBuilder()
    .setType("Birthday")
    .setFlavor("Vanilla")
    .setFilling("Strawberry")
    .setSize(10)
    .build();

  beforeEach(() => {
    repo = new CakeRepository();
    jest.clearAllMocks();
  });

  it("should successfully load cakes", async () => {
    const mockRows = [
      {
        id: "1",
        type: "Birthday",
        flavor: "Vanilla",
        filling: "Strawberry",
        size: 10,
      },
    ];
    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: mockRows });

    const cakes = await repo.load();
    expect(pool.query).toHaveBeenCalledWith("SELECT * FROM cakes");
    expect(cakes.length).toBe(1);
    expect(cakes[0].getType()).toBe("Birthday");
  });

  it("should successfully save a cake", async () => {
    (pool.query as jest.Mock).mockResolvedValueOnce({});
    await repo.save(mockCake);
    expect(pool.query).toHaveBeenCalledTimes(1);
  });

  it("should successfully update a cake", async () => {
    (pool.query as jest.Mock).mockResolvedValueOnce({});
    await repo.update("1", mockCake);
    expect(pool.query).toHaveBeenCalledTimes(1);
  });

  it("should successfully delete a cake", async () => {
    (pool.query as jest.Mock).mockResolvedValueOnce({});
    await repo.delete("1");
    expect(pool.query).toHaveBeenCalledWith("DELETE FROM cakes WHERE id = $1", [
      "1",
    ]);
  });

  // --- Edge Cases ---

  it("should handle null values by rejecting invalid saves", async () => {
    (pool.query as jest.Mock).mockRejectedValueOnce(
      new Error("null value in column violates not-null constraint"),
    );
    await expect(repo.save(mockCake)).rejects.toThrow(
      "null value in column violates not-null constraint",
    );
  });

  it("should handle duplicate entries gracefully", async () => {
    (pool.query as jest.Mock).mockRejectedValueOnce({
      code: "23505",
      message: "duplicate key value violates unique constraint",
    });
    await expect(repo.save(mockCake)).rejects.toMatchObject({ code: "23505" });
  });

  it("should handle transaction rollbacks/query failures", async () => {
    (pool.query as jest.Mock).mockRejectedValueOnce(
      new Error("Connection terminated unexpectedly"),
    );
    await expect(repo.load()).rejects.toThrow(
      "Connection terminated unexpectedly",
    );
  });
});
