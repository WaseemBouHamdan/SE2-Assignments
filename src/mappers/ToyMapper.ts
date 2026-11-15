import { IMapper } from "./IMapper";
import { Toy, ToyBuilder } from "../models/Toy";
import { MapperInput } from "./BookMapper";

export class ToyMapper implements IMapper<MapperInput, Toy> {
  map(data: MapperInput): Toy {
    const builder = new ToyBuilder();

    if (Array.isArray(data)) {
      return builder
        .setName(data[1])
        .setBrand(data[2])
        .setRecommendedAge(parseInt(data[3], 10))
        .setMaterial(data[4])
        .build();
    } else if (typeof data === "object" && data !== null) {
      return builder
        .setName(data.name || "")
        .setBrand(data.brand || "")
        .setRecommendedAge(parseInt(data.recommendedAge || "0", 10))
        .setMaterial(data.material || "")
        .build();
    }

    throw new Error("Invalid data format provided to Mapper");
  }

  reverseMap(data: Toy): Record<string, unknown> {
    return {
      name: data.getName(),
      brand: data.getBrand(),
      recommendedAge: data.getRecommendedAge(),
      material: data.getMaterial(),
    };
  }
}
