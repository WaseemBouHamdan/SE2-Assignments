import { RepositoryFactory } from "../factories/RepositoryFactory";
import { ItemCategory } from "../enums/ItemCategory";
import { Item } from "../models/Item";

interface CategoryItems {
  category: ItemCategory;
  items: Item[];
}

export class AnalyticsService {
  private cachedItems: CategoryItems[] | null = null;

  private async loadAllCategoryItems() {
    if (this.cachedItems) {
      return this.cachedItems;
    }

    const categories = Object.values(ItemCategory);
    const itemsByCategory: CategoryItems[] = [];

    for (const category of categories) {
      const repo = RepositoryFactory.createRepository(category);
      const items = await repo.load();
      itemsByCategory.push({ category, items });
    }

    this.cachedItems = itemsByCategory;
    return itemsByCategory;
  }

  public clearCache(): void {
    this.cachedItems = null;
  }

  public async getSummary() {
    const breakdown = await this.getBreakdown();

    let totalOrders = 0;
    let totalRevenue = 0;

    for (const entry of breakdown) {
      totalOrders += entry.orderCount;
      totalRevenue += entry.categoryRevenue;
    }

    return { totalOrders, totalRevenue };
  }

  public async getBreakdown() {
    const itemsByCategory = await this.loadAllCategoryItems();
    const breakdown = [];

    for (const entry of itemsByCategory) {
      let categoryRevenue = 0;
      for (const item of entry.items) {
        categoryRevenue += item.getPrice() * item.getQuantity();
      }

      breakdown.push({
        itemType: entry.category,
        orderCount: entry.items.length,
        categoryRevenue: categoryRevenue,
      });
    }

    return breakdown;
  }

  public async getAverageOrderValue(): Promise<number> {
    const summary = await this.getSummary();
    if (summary.totalOrders === 0) return 0;
    return summary.totalRevenue / summary.totalOrders;
  }

  public async getTopSellingCategory() {
    const breakdown = await this.getBreakdown();
    if (breakdown.length === 0) return null;

    // Sort to find the category with the highest order count
    return breakdown.reduce((prev, current) =>
      prev.orderCount > current.orderCount ? prev : current,
    );
  }
}
