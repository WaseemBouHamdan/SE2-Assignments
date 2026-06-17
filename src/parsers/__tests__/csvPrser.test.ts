import { parseCSV } from "../csvParser";
import path from "path";

describe("CSV Parser", () => {
  it("should successfully parse a valid CSV file", async () => {
    // Arrange: Point to the cake orders CSV file
    const validFilePath = path.resolve(__dirname, "../../data/cake orders.csv");

    // Act
    const result = await parseCSV(validFilePath);

    // Assert
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it("should throw an error when parsing a non-existent file", async () => {
    // Arrange
    const invalidFilePath = path.resolve(__dirname, "../../data/missing.csv");

    // Act & Assert
    await expect(parseCSV(invalidFilePath)).rejects.toThrow();
  });
});
