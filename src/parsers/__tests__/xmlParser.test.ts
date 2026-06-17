import { parseXML } from "../xmlParser";
import path from "path";

describe("XML Parser", () => {
  it("should successfully parse a valid XML file", async () => {
    // Arrange: Point to the toy orders XML file
    const validFilePath = path.resolve(__dirname, "../../data/toy orders.xml");

    // Act
    const result = await parseXML(validFilePath);

    // Assert
    expect(result).toBeDefined();
    // xml2js wraps the output in a root object based on the XML structure (e.g., <data>)
    expect(result.data).toBeDefined();
    expect(result.data.row.length).toBeGreaterThan(0);
  });

  it("should throw an error when parsing a non-existent file", async () => {
    // Arrange
    const invalidFilePath = path.resolve(__dirname, "../../data/missing.xml");

    // Act & Assert
    await expect(parseXML(invalidFilePath)).rejects.toThrow();
  });
});
