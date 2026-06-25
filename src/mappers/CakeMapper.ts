import { IMapper } from "./IMapper";
import { Cake, CakeBuilder } from "../models/Cake";

export class CakeMapper implements IMapper<any, Cake> {
  map(data: any): Cake {
    const builder = new CakeBuilder();

    // Handle CSV Format (Array of strings)
    // Assuming CSV structure: [id, type, flavor, filling, size, packaging]
    if (Array.isArray(data)) {
      return builder
        .setType(data[1])
        .setFlavor(data[2])
        .setFilling(data[3])
        .setSize(parseInt(data[4], 10))
        .build();
    }
    // Handle JSON/XML Format (Object)
    else if (typeof data === "object" && data !== null) {
      return builder
        .setType(data.type)
        .setFlavor(data.flavor)
        .setFilling(data.filling)
        .setSize(parseInt(data.size, 10))
        .build();
    }

    throw new Error("Invalid data format provided to Mapper");
  }

  reverseMap(data: Cake): any {
    return {
      type: data.getType(),
      flavor: data.getFlavor(),
      filling: data.getFilling(),
      size: data.getSize(),
    };
  }
}
