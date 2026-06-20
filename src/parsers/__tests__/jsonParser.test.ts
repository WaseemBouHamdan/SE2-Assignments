import { parseJSON } from "../jsonParser";
import path from "path";

describe("JSON Parser", () => {
  it("should successfully parse a valid JSON file", async () => {
    // Arrange: Point to the file you just dragged in
    const validFilePath = path.resolve(
      __dirname,
      "../../data/book orders.json",
    );

    // Act
    const result = await parseJSON(validFilePath);

    // Assert
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty("Order ID");
  });

  it("should throw an error when parsing a non-existent file", async () => {
    // Arrange
    const invalidFilePath = path.resolve(__dirname, "../../data/missing.json");

    // Act & Assert
    await expect(parseJSON(invalidFilePath)).rejects.toThrow();
  });
});
