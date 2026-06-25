import { IRepository } from "./IRepository";
import { Cake } from "../models/Cake";
import { CakeMapper } from "../mappers/CakeMapper";
import { pool } from "../database/db";

export class CakeRepository implements IRepository<Cake> {
  private mapper = new CakeMapper();

  async load(): Promise<Cake[]> {
    const { rows } = await pool.query("SELECT * FROM cakes");
    return rows.map((row) => this.mapper.map(row));
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
