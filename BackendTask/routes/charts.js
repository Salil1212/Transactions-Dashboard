const express = require("express");
const router = express.Router();
const ProductTransaction = require("../models/ProductTransaction");

async function pieChartHandler(req, res) {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ message: "Month parameter is required" });
  }

  try {
    const selectedMonth = parseInt(month, 10);

    const pipeline = [
      {
        $match: {
          $expr: { $eq: [{ $month: "$dateOfSale" }, selectedMonth] },
        },
      },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ];

    const categoryCounts = await ProductTransaction.aggregate(pipeline);

    res.json(categoryCounts);
  } catch (error) {
    console.error("Error fetching pie chart data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

router.get("/pie-chart", pieChartHandler);

async function barChartHandler(req, res) {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ message: "Month parameter is required" });
  }

  try {
    const selectedMonth = parseInt(month, 10);

    const priceRanges = [
      { range: "0-100", min: 0, max: 100 },
      { range: "101-200", min: 101, max: 200 },
      { range: "201-300", min: 201, max: 300 },
      { range: "301-400", min: 301, max: 400 },
      { range: "401-500", min: 401, max: 500 },
      { range: "501-600", min: 501, max: 600 },
      { range: "601-700", min: 601, max: 700 },
      { range: "701-800", min: 701, max: 800 },
      { range: "801-900", min: 801, max: 900 },
      { range: "901-above", min: 901, max: Infinity },
    ];

    const pipeline = [
      {
        $match: {
          $expr: { $eq: [{ $month: "$dateOfSale" }, selectedMonth] },
        },
      },
      {
        $project: {
          title: 1,
          description: 1,
          price: 1,
          dateOfSale: 1,
          sold: 1,
          category: 1,
          priceRange: {
            $switch: {
              branches: priceRanges.map((range) => ({
                case: {
                  $and: [
                    { $gte: ["$price", range.min] },
                    { $lt: ["$price", range.max] },
                  ],
                },
                then: range.range,
              })),
              default: "Other",
            },
          },
        },
      },
      {
        $group: {
          _id: "$priceRange",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ];

    const priceRangeCounts = await ProductTransaction.aggregate(pipeline);

    res.json(priceRangeCounts);
  } catch (error) {
    console.error("Error fetching bar chart data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

router.get("/bar-chart", barChartHandler);

module.exports = router;
