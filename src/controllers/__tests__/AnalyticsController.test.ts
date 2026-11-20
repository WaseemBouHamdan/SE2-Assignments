import { AnalyticsController } from "../AnalyticsController";
import { AnalyticsService } from "../../services/AnalyticsService";
import { Request, Response } from "express";

describe("AnalyticsController", () => {
  let analyticsController: AnalyticsController;
  let mockAnalyticsService: Partial<AnalyticsService>;
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    mockAnalyticsService = {
      getSummary: jest.fn(),
      getBreakdown: jest.fn(),
    };

    analyticsController = new AnalyticsController(
      mockAnalyticsService as AnalyticsService,
    );

    mockReq = { query: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("getTotalOrders", () => {
    it("should return total orders successfully with a 200 status", async () => {
      (mockAnalyticsService.getSummary as jest.Mock).mockResolvedValue({
        totalOrders: 150,
        totalRevenue: 5000,
      });

      await analyticsController.getTotalOrders(
        mockReq as Request,
        mockRes as Response,
      );

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ totalOrders: 150 });
    });
  });

  describe("getTotalRevenue", () => {
    it("should return total revenue successfully with a 200 status", async () => {
      (mockAnalyticsService.getSummary as jest.Mock).mockResolvedValue({
        totalOrders: 150,
        totalRevenue: 5000,
      });

      await analyticsController.getTotalRevenue(
        mockReq as Request,
        mockRes as Response,
      );

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ totalRevenue: 5000 });
    });
  });

  describe("getOrderCountsByType", () => {
    const mockBreakdown = [
      { itemType: "CAKE", orderCount: 10, categoryRevenue: 200 },
      { itemType: "BOOK", orderCount: 50, categoryRevenue: 1000 },
    ];

    it("should return formatted order counts without sorting", async () => {
      (mockAnalyticsService.getBreakdown as jest.Mock).mockResolvedValue([
        ...mockBreakdown,
      ]);

      await analyticsController.getOrderCountsByType(
        mockReq as Request,
        mockRes as Response,
      );

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith([
        { itemType: "CAKE", orderCount: 10 },
        { itemType: "BOOK", orderCount: 50 },
      ]);
    });

    it("should return a 400 response if an invalid sort parameter is provided", async () => {
      mockReq.query = { sort: "invalid_sort" };

      await analyticsController.getOrderCountsByType(
        mockReq as Request,
        mockRes as Response,
      );

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Invalid sort parameter. Use 'count' or '-count'.",
      });
      expect(mockAnalyticsService.getBreakdown).not.toHaveBeenCalled();
    });
  });

  describe("getRevenueBreakdownByType", () => {
    const mockBreakdown = [
      { itemType: "CAKE", orderCount: 10, categoryRevenue: 200 },
      { itemType: "BOOK", orderCount: 50, categoryRevenue: 1000 },
    ];

    it("should sort revenue in descending order when sort=-revenue is provided", async () => {
      (mockAnalyticsService.getBreakdown as jest.Mock).mockResolvedValue([
        ...mockBreakdown,
      ]);
      mockReq.query = { sort: "-revenue" };

      await analyticsController.getRevenueBreakdownByType(
        mockReq as Request,
        mockRes as Response,
      );

      expect(mockRes.status).toHaveBeenCalledWith(200);
      // BOOK should be first because 1000 > 200
      expect(mockRes.json).toHaveBeenCalledWith([
        { itemType: "BOOK", categoryRevenue: 1000 },
        { itemType: "CAKE", categoryRevenue: 200 },
      ]);
    });

    it("should return a 400 response if an invalid sort parameter is provided", async () => {
      mockReq.query = { sort: "bad_param" };

      await analyticsController.getRevenueBreakdownByType(
        mockReq as Request,
        mockRes as Response,
      );

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Invalid sort parameter. Use 'revenue' or '-revenue'.",
      });
      expect(mockAnalyticsService.getBreakdown).not.toHaveBeenCalled();
    });
  });
});
