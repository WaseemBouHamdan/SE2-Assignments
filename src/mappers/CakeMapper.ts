import { IMapper } from "./IMapper";
import { Cake, CakeBuilder } from "../models/Cake";
import { MapperInput } from "./BookMapper";

export class CakeMapper implements IMapper<MapperInput, Cake> {
  map(data: MapperInput): Cake {
    const builder = new CakeBuilder();

    if (Array.isArray(data)) {
      return builder
        .setType(data[1])
        .setFlavor(data[2])
        .setFilling(data[3])
        .setSize(parseInt(data[4], 10))
        .build();
    } else if (typeof data === "object" && data !== null) {
      return builder
        .setType(data.type || "")
        .setFlavor(data.flavor || "")
        .setFilling(data.filling || "")
        .setSize(parseInt(data.size || "0", 10))
        .build();
    }

    throw new Error("Invalid data format provided to Mapper");
  }

  reverseMap(data: Cake): Record<string, unknown> {
    return {
      type: data.getType(),
      flavor: data.getFlavor(),
      filling: data.getFilling(),
      size: data.getSize(),
    };
  }
}
