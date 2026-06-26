export enum ItemCategory {
  CAKE = "cake",
  BOOK = "book",
  TOY = "toy",
}

export interface Item {
  getCategory(): ItemCategory;
}
