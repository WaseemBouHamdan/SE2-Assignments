import { Request, Response } from "express";
import { AnalyticsService } from "../services/AnalyticsService";

export class AnalyticsController {
  // Dependency Injection: The controller relies on the service for business logic.
  constructor(private readonly analyticsService: AnalyticsService) {}

  public async getTotalOrders(req: Request, res: Response): Promise<void> {
    const summary = await this.analyticsService.getSummary();
    res.status(200).json({ totalOrders: summary.totalOrders });
  }

  public async getTotalRevenue(req: Request, res: Response): Promise<void> {
    const summary = await this.analyticsService.getSummary();
    res.status(200).json({ totalRevenue: summary.totalRevenue });
  }

  public async getOrderCountsByType(
    req: Request,
    res: Response,
  ): Promise<void> {
    let breakdown = await this.analyticsService.getBreakdown();

    // Extract and validate query parameters
    const sort = req.query.sort as string;
    if (sort && sort !== "-count" && sort !== "count") {
      throw new Error("Invalid sort parameter. Use 'count' or '-count'.");
    }

    // Apply sorting logic if requested
    if (sort === "-count") {
      breakdown = breakdown.sort((a, b) => b.orderCount - a.orderCount);
    } else if (sort === "count") {
      breakdown = breakdown.sort((a, b) => a.orderCount - b.orderCount);
    }

    // Format response according to API design (hiding revenue for this specific endpoint)
    const result = breakdown.map((b) => ({
      itemType: b.itemType,
      orderCount: b.orderCount,
    }));

    res.status(200).json(result);
  }

  public async getRevenueBreakdownByType(
    req: Request,
    res: Response,
  ): Promise<void> {
    let breakdown = await this.analyticsService.getBreakdown();

    // Extract and validate query parameters
    const sort = req.query.sort as string;
    if (sort && sort !== "-revenue" && sort !== "revenue") {
      throw new Error("Invalid sort parameter. Use 'revenue' or '-revenue'.");
    }

    // Apply sorting logic if requested
    if (sort === "-revenue") {
      breakdown = breakdown.sort(
        (a, b) => b.categoryRevenue - a.categoryRevenue,
      );
    } else if (sort === "revenue") {
      breakdown = breakdown.sort(
        (a, b) => a.categoryRevenue - b.categoryRevenue,
      );
    }

    // Format response according to API design (hiding counts for this specific endpoint)
    const result = breakdown.map((b) => ({
      itemType: b.itemType,
      categoryRevenue: b.categoryRevenue,
    }));

    res.status(200).json(result);
  }
}
