import { IRepository } from "./IRepository";
import { Toy } from "../models/Toy";
import { ToyMapper } from "../mappers/ToyMapper";
import { pool } from "../database/db";

export class ToyRepository implements IRepository<Toy> {
  private mapper = new ToyMapper();

  async load(): Promise<Toy[]> {
    const { rows } = await pool.query("SELECT * FROM toys");
    return rows.map((row) => this.mapper.map(row));
  }

  async save(toy: Toy): Promise<void> {
    const data = this.mapper.reverseMap(toy);
    await pool.query(
      "INSERT INTO toys (id, name, brand, recommendedAge, material) VALUES ($1, $2, $3, $4, $5)",
      [data.id, data.name, data.brand, data.recommendedAge, data.material],
    );
  }

  async update(id: string, toy: Toy): Promise<void> {
    const data = this.mapper.reverseMap(toy);
    await pool.query(
      "UPDATE toys SET name=$1, brand=$2, recommendedAge=$3, material=$4 WHERE id=$5",
      [data.name, data.brand, data.recommendedAge, data.material, id],
    );
  }

  async delete(id: string): Promise<void> {
    await pool.query("DELETE FROM toys WHERE id = $1", [id]);
  }
}
