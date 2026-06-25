import { CakeMapper } from "../CakeMapper";

describe("CakeMapper", () => {
  const mapper = new CakeMapper();

  it("should map CSV array to a Cake object", () => {
    const csvData = ["1", "Wedding", "Vanilla", "Strawberry", "10"];
    const cake = mapper.map(csvData);
    expect(cake.getType()).toBe("Wedding");
    expect(cake.getSize()).toBe(10);
  });

  it("should map JSON/XML object to a Cake object", () => {
    const jsonData = {
      type: "Birthday",
      flavor: "Chocolate",
      filling: "Fudge",
      size: "8",
    };
    const cake = mapper.map(jsonData);
    expect(cake.getType()).toBe("Birthday");
    expect(cake.getSize()).toBe(8);
  });

  it("should throw Builder error for missing required fields", () => {
    const malformedData = { type: "Birthday", flavor: "Chocolate" }; // Missing size and filling
    expect(() => mapper.map(malformedData)).toThrow();
  });
});
