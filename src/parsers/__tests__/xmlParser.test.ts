import { parseXML } from "../xmlParser";
import path from "path";

describe("XML Parser", () => {
  it("should successfully parse a valid XML file", async () => {
    const validFilePath = path.resolve(__dirname, "../../data/toy orders.xml");

    // Cast the result so TypeScript knows about the nested 'data' and 'row' structure
    const result = (await parseXML(validFilePath)) as { data: { row: any[] } };

    expect(result).toBeDefined();
    expect(result.data).toBeDefined();
    expect(result.data.row.length).toBeGreaterThan(0);

    const firstRow = result.data.row[0];
    expect(firstRow).toBeDefined();
    expect(typeof firstRow).toBe("object");
    expect(Object.keys(firstRow).length).toBeGreaterThan(0);
  });

  it("should throw an error when parsing a non-existent file", async () => {
    const invalidFilePath = path.resolve(__dirname, "../../data/missing.xml");
    await expect(parseXML(invalidFilePath)).rejects.toThrow();
  });
});
