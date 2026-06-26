import { ToyBuilder } from "../Toy";

describe("ToyBuilder", () => {
  it("should successfully build a Toy when all properties are set", () => {
    const toy = new ToyBuilder()
      .setName("Action Figure")
      .setBrand("HeroCo")
      .setRecommendedAge(5)
      .setMaterial("Plastic")
      .build();

    expect(toy.getName()).toBe("Action Figure");
    expect(toy.getBrand()).toBe("HeroCo");
    expect(toy.getRecommendedAge()).toBe(5);
    expect(toy.getMaterial()).toBe("Plastic");
  });

  it("should throw an error if required fields are missing", () => {
    const incompleteBuilder = new ToyBuilder().setName("Action Figure");

    expect(() => incompleteBuilder.build()).toThrow(
      "Missing required fields to build Toy",
    );
  });
});
