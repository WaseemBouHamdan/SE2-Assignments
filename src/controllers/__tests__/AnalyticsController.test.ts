import { AnalyticsController } from "../AnalyticsController";
import { AnalyticsService } from "../../services/AnalyticsService";
import { Request, Response } from "express";

describe("AnalyticsController", () => {
  let analyticsController: AnalyticsController;
  let mockAnalyticsService: Partial<AnalyticsService>;
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    // 1. Mock the Service Layer (we only define the methods the controller uses)
    mockAnalyticsService = {
      getSummary: jest.fn(),
      getBreakdown: jest.fn(),
    };

    // 2. Inject the mock service into the controller
    analyticsController = new AnalyticsController(
      mockAnalyticsService as AnalyticsService,
    );

    // 3. Mock Express Request and Response objects
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
      // It should strip out the revenue data and only return itemType and orderCount
      expect(mockRes.json).toHaveBeenCalledWith([
        { itemType: "CAKE", orderCount: 10 },
        { itemType: "BOOK", orderCount: 50 },
      ]);
    });

    it("should throw an error if an invalid sort parameter is provided", async () => {
      mockReq.query = { sort: "invalid_sort" };

      // Because there is no try/catch in the controller, it returns a rejected promise
      await expect(
        analyticsController.getOrderCountsByType(
          mockReq as Request,
          mockRes as Response,
        ),
      ).rejects.toThrow("Invalid sort parameter. Use 'count' or '-count'.");
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

    it("should throw an error if an invalid sort parameter is provided", async () => {
      mockReq.query = { sort: "bad_param" };

      await expect(
        analyticsController.getRevenueBreakdownByType(
          mockReq as Request,
          mockRes as Response,
        ),
      ).rejects.toThrow("Invalid sort parameter. Use 'revenue' or '-revenue'.");
    });
  });
});
