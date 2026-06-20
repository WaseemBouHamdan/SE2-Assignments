import { IMapper } from "./IMapper";
import { Toy, ToyBuilder } from "../models/Toy";

export class ToyMapper implements IMapper<any, Toy> {
  map(data: any): Toy {
    const builder = new ToyBuilder();

    if (Array.isArray(data)) {
      // CSV format: [id, name, brand, recommendedAge, material]
      return builder
        .setName(data[1])
        .setBrand(data[2])
        .setRecommendedAge(parseInt(data[3], 10))
        .setMaterial(data[4])
        .build();
    } else if (typeof data === "object" && data !== null) {
      // JSON/XML format
      return builder
        .setName(data.name)
        .setBrand(data.brand)
        .setRecommendedAge(parseInt(data.recommendedAge, 10))
        .setMaterial(data.material)
        .build();
    }

    throw new Error("Invalid data format provided to Mapper");
  }

  reverseMap(data: Toy): any {
    return {
      name: data.getName(),
      brand: data.getBrand(),
      recommendedAge: data.getRecommendedAge(),
      material: data.getMaterial(),
    };
  }
}
