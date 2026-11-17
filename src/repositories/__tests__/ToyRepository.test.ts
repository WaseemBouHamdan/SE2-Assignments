import { ToyRepository } from "../ToyRepository";
import { pool } from "../../database/db";
import { ToyBuilder } from "../../models/Toy";

jest.mock("../../database/db", () => ({
  pool: { query: jest.fn() },
}));

describe("ToyRepository CRUD and Edge Cases", () => {
  let repo: ToyRepository;
  const mockToy = new ToyBuilder()
    .setName("Lego Set")
    .setBrand("Lego")
    .setRecommendedAge(8)
    .setMaterial("Plastic")
    .build();

  beforeEach(() => {
    repo = new ToyRepository();
    jest.clearAllMocks();
  });

  it("should successfully load toys", async () => {
    const mockRows = [
      {
        id: "1",
        name: "Lego Set",
        brand: "Lego",
        recommendedAge: 8,
        material: "Plastic",
      },
    ];
    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: mockRows });

    const toys = await repo.load();
    expect(pool.query).toHaveBeenCalledWith("SELECT * FROM toys");
    expect(toys[0].getName()).toBe("Lego Set");
  });

  it("should successfully save a toy", async () => {
    (pool.query as jest.Mock).mockResolvedValueOnce({});
    await repo.save(mockToy);
    expect(pool.query).toHaveBeenCalledTimes(1);
  });

  it("should handle duplicate entries gracefully", async () => {
    (pool.query as jest.Mock).mockRejectedValueOnce({ code: "23505" });
    await expect(repo.save(mockToy)).rejects.toMatchObject({ code: "23505" });
  });

  it("should handle transaction rollbacks/query failures", async () => {
    (pool.query as jest.Mock).mockRejectedValueOnce(new Error("DB Timeout"));
    await expect(repo.load()).rejects.toThrow("DB Timeout");
  });
});
