import { AnalyticsService } from "../AnalyticsService";
import { RepositoryFactory } from "../../factories/RepositoryFactory";
import { ItemCategory } from "../../enums/ItemCategory";

// Mock the RepositoryFactory to prevent actual database calls
jest.mock("../../factories/RepositoryFactory");

describe("AnalyticsService", () => {
  let analyticsService: AnalyticsService;

  beforeEach(() => {
    analyticsService = new AnalyticsService();
    jest.clearAllMocks();

    // Mock implementation for the RepositoryFactory
    (RepositoryFactory.createRepository as jest.Mock).mockImplementation(
      (category: ItemCategory) => {
        return {
          load: jest.fn().mockResolvedValue(getMockDataForCategory(category)),
        };
      },
    );
  });

  // Helper to supply fake database rows
  const getMockDataForCategory = (category: ItemCategory) => {
    if (category === ItemCategory.CAKE) {
      return [
        { getPrice: () => 20, getQuantity: () => 2 }, // Revenue: 40
        { getPrice: () => 15, getQuantity: () => 1 }, // Revenue: 15
      ]; // Total Cake Revenue: 55, Count: 2
    }
    if (category === ItemCategory.BOOK) {
      return [
        { getPrice: () => 30, getQuantity: () => 1 }, // Revenue: 30
      ]; // Total Book Revenue: 30, Count: 1
    }
    if (category === ItemCategory.TOY) {
      return []; // Total Toy Revenue: 0, Count: 0
    }
    return [];
  };

  it("should calculate overall order summary correctly", async () => {
    const summary = await analyticsService.getSummary();

    // Total Orders: 2 Cakes + 1 Book + 0 Toys = 3
    expect(summary.totalOrders).toBe(3);
    // Total Revenue: 55 (Cake) + 30 (Book) + 0 (Toy) = 85
    expect(summary.totalRevenue).toBe(85);
  });

  it("should compute accurate breakdown by item type", async () => {
    const breakdown = await analyticsService.getBreakdown();

    expect(breakdown).toHaveLength(3);
    expect(breakdown).toContainEqual({
      itemType: ItemCategory.CAKE,
      orderCount: 2,
      categoryRevenue: 55,
    });
    expect(breakdown).toContainEqual({
      itemType: ItemCategory.TOY,
      orderCount: 0,
      categoryRevenue: 0,
    });
  });

  it("should calculate the average order value (AOV)", async () => {
    const aov = await analyticsService.getAverageOrderValue();
    // 85 Total Revenue / 3 Total Orders = 28.333...
    expect(aov).toBeCloseTo(28.33);
  });

  it("should identify the top selling category", async () => {
    const topCategory = await analyticsService.getTopSellingCategory();

    // Cakes have the highest count (2)
    expect(topCategory?.itemType).toBe(ItemCategory.CAKE);
    expect(topCategory?.orderCount).toBe(2);
  });
});
