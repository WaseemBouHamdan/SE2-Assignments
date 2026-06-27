import { RepositoryFactory } from "../factories/RepositoryFactory";
import { ItemCategory } from "../enums/ItemCategory";

export class AnalyticsService {
  /*
    Calculates total order count and total revenue across all categories
   */
  public async getSummary() {
    const categories = Object.values(ItemCategory);
    let totalOrders = 0;
    let totalRevenue = 0;

    for (const category of categories) {
      const repo = RepositoryFactory.createRepository(category);
      const items = await repo.load();

      totalOrders += items.length;

      for (const item of items) {
        // Utilizing the calculation method shown in Module 4.5
        totalRevenue += (item as any).getPrice() * (item as any).getQuantity();
      }
    }

    return { totalOrders, totalRevenue };
  }

  /*
    Computes order count and revenue breakdown grouped by item type
   */
  public async getBreakdown() {
    const categories = Object.values(ItemCategory);
    const breakdown = [];

    for (const category of categories) {
      const repo = RepositoryFactory.createRepository(category);
      const items = await repo.load();

      let categoryRevenue = 0;
      for (const item of items) {
        categoryRevenue +=
          (item as any).getPrice() * (item as any).getQuantity();
      }

      breakdown.push({
        itemType: category,
        orderCount: items.length,
        categoryRevenue: categoryRevenue,
      });
    }

    return breakdown;
  }

  /*
    Calculates the Average Order Value (AOV)
   */
  public async getAverageOrderValue(): Promise<number> {
    const summary = await this.getSummary();
    if (summary.totalOrders === 0) return 0;
    return summary.totalRevenue / summary.totalOrders;
  }

  /**
   * Identifies the category with the highest sales volume
   */
  public async getTopSellingCategory() {
    const breakdown = await this.getBreakdown();
    if (breakdown.length === 0) return null;

    // Sort to find the category with the highest order count
    return breakdown.reduce((prev, current) =>
      prev.orderCount > current.orderCount ? prev : current,
    );
  }
}
