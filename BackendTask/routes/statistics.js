const express = require("express");
const router = express.Router();
const ProductTransaction = require("../models/ProductTransaction");

// GET /statistics
// API to fetch statistics for selected month
async function statisticsHandler(req, res) {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ message: "Month parameter is required" });
  }

  try {
    const selectedMonth = parseInt(month, 10);

    // Calculate total sale amount of selected month
    const totalSaleAmount = await ProductTransaction.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $month: "$dateOfSale" }, selectedMonth] },
          sold: true,
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$price" },
        },
      },
    ]);

    // Calculate total number of sold items of selected month
    const totalSoldItems = await ProductTransaction.countDocuments({
      $expr: { $eq: [{ $month: "$dateOfSale" }, selectedMonth] },
      sold: true,
    });

    // Calculate total number of not sold items of selected month
    const totalNotSoldItems = await ProductTransaction.countDocuments({
      $expr: { $eq: [{ $month: "$dateOfSale" }, selectedMonth] },
      sold: false,
    });

    res.json({
      month: selectedMonth,
      total_sale_amount:
        totalSaleAmount.length > 0 ? totalSaleAmount[0].totalAmount : 0,
      total_sold_items: totalSoldItems,
      total_not_sold_items: totalNotSoldItems,
    });
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Define route for handling GET /statistics
router.get("/", statisticsHandler);

module.exports = router;
