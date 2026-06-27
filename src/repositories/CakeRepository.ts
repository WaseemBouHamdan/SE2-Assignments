import { IRepository } from "./IRepository";
import { Cake } from "../models/Cake";
import { MapperFactory } from "../factories/MapperFactory";
import { ItemCategory } from "../enums/ItemCategory";
import { pool } from "../database/db";
import { IMapper } from "../mappers/IMapper";

export class CakeRepository implements IRepository<Cake> {
  // Centralized instantiation via MapperFactory
  private mapper = MapperFactory.createMapper(ItemCategory.CAKE) as IMapper<
    any,
    Cake
  >;
  async load(): Promise<Cake[]> {
    const { rows } = await pool.query("SELECT * FROM cakes");
    return rows.map((row) => this.mapper.map(row) as Cake);
  }

  async save(cake: Cake): Promise<void> {
    const data = this.mapper.reverseMap(cake);
    await pool.query(
      "INSERT INTO cakes (id, type, flavor, filling, size) VALUES ($1, $2, $3, $4, $5)",
      [data.id, data.type, data.flavor, data.filling, data.size],
    );
  }

  async update(id: string, cake: Cake): Promise<void> {
    const data = this.mapper.reverseMap(cake);
    await pool.query(
      "UPDATE cakes SET type=$1, flavor=$2, filling=$3, size=$4 WHERE id=$5",
      [data.type, data.flavor, data.filling, data.size, id],
    );
  }

  async delete(id: string): Promise<void> {
    await pool.query("DELETE FROM cakes WHERE id = $1", [id]);
  }
}
