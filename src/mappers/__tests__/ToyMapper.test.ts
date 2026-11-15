import { ToyMapper } from "../ToyMapper";

describe("ToyMapper", () => {
  const mapper = new ToyMapper();

  it("should map CSV array to a Toy object", () => {
    const csvData = ["1", "Lego Set", "Lego", "8", "Plastic"];
    const toy = mapper.map(csvData);
    expect(toy.getName()).toBe("Lego Set");
    expect(toy.getRecommendedAge()).toBe(8);
  });

  it("should map JSON/XML object to a Toy object", () => {
    const jsonData = {
      name: "Teddy Bear",
      brand: "ToyCo",
      recommendedAge: "3",
      material: "Plush",
    };
    const toy = mapper.map(jsonData);
    expect(toy.getName()).toBe("Teddy Bear");
    expect(toy.getRecommendedAge()).toBe(3);
  });

  it("should throw Builder error for missing required fields", () => {
    const malformedData = { name: "Broken Toy" };
    expect(() => mapper.map(malformedData)).toThrow();
  });
});
