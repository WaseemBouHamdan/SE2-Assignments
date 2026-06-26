import { CakeBuilder } from "../Cake";

describe("CakeBuilder", () => {
  it("should successfully build a Cake when all properties are set", () => {
    const cake = new CakeBuilder()
      .setType("Birthday")
      .setFlavor("Chocolate")
      .setFilling("Vanilla Cream")
      .setSize(12)
      .build();

    expect(cake.getType()).toBe("Birthday");
    expect(cake.getFlavor()).toBe("Chocolate");
    expect(cake.getFilling()).toBe("Vanilla Cream");
    expect(cake.getSize()).toBe(12);
  });

  it("should throw an error if required fields are missing", () => {
    const incompleteBuilder = new CakeBuilder().setType("Wedding");

    expect(() => incompleteBuilder.build()).toThrow(
      "Missing required fields to build Cake",
    );
  });
});
