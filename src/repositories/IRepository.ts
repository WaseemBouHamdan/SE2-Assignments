export interface IRepository<T> {
  load(): Promise<T[]>;
  save(item: T): Promise<void>;
  update(id: string, item: T): Promise<void>;
  delete(id: string): Promise<void>;
}
