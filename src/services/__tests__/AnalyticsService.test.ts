import { AnalyticsService } from "../AnalyticsService";
import { RepositoryFactory } from "../../factories/RepositoryFactory";
import { ItemCategory } from "../../enums/ItemCategory";
import { CakeBuilder } from "../../models/Cake";
import { BookBuilder } from "../../models/Book";
import { ToyBuilder } from "../../models/Toy";

jest.mock("../../factories/RepositoryFactory");

describe("AnalyticsService", () => {
  let analyticsService: AnalyticsService;

  beforeEach(() => {
    analyticsService = new AnalyticsService();
    jest.clearAllMocks();

    (RepositoryFactory.createRepository as jest.Mock).mockImplementation(
      (category: ItemCategory) => {
        return {
          load: jest.fn().mockResolvedValue(getMockDataForCategory(category)),
        };
      },
    );
  });

  const getMockDataForCategory = (category: ItemCategory) => {
    if (category === ItemCategory.CAKE) {
      return [
        new CakeBuilder()
          .setType("Birthday")
          .setFlavor("Chocolate")
          .setFilling("Cream")
          .setSize(8)
          .setPrice(20)
          .setQuantity(2)
          .build(),
        new CakeBuilder()
          .setType("Wedding")
          .setFlavor("Vanilla")
          .setFilling("Strawberry")
          .setSize(6)
          .setPrice(15)
          .setQuantity(1)
          .build(),
      ];
    }
    if (category === ItemCategory.BOOK) {
      return [
        new BookBuilder()
          .setTitle("Clean Code")
          .setAuthor("Robert C. Martin")
          .setPages(464)
          .setIsbn("978-0132350884")
          .setPrice(30)
          .setQuantity(1)
          .build(),
      ];
    }
    if (category === ItemCategory.TOY) {
      return [];
    }
    return [];
  };

  it("should calculate overall order summary correctly", async () => {
    const summary = await analyticsService.getSummary();

    expect(summary.totalOrders).toBe(3);
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

  it("should cache repository results across multiple analytics calls", async () => {
    await analyticsService.getSummary();
    await analyticsService.getBreakdown();
    await analyticsService.getAverageOrderValue();
    await analyticsService.getTopSellingCategory();

    expect(RepositoryFactory.createRepository).toHaveBeenCalledTimes(3);

    analyticsService.clearCache();
    await analyticsService.getSummary();
    expect(RepositoryFactory.createRepository).toHaveBeenCalledTimes(6);
  });
});
