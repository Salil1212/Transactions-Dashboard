const express = require("express");
const router = express.Router();
const ProductTransaction = require("../models/ProductTransaction");

// GET /transactions
// API to list all transactions with search, pagination, and month filtering
async function transactionsHandler(req, res) {
  const { search = "", page = 1, per_page = 10, month } = req.query;

  const matchQuery = {};

  if (search) {
    const searchRegex = { $regex: search, $options: "i" };
    const searchNumber = parseFloat(search);

    // Separate conditions for price if it's a valid number
    if (!isNaN(searchNumber)) {
      matchQuery.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { price: searchNumber },
      ];
    } else {
      matchQuery.$or = [{ title: searchRegex }, { description: searchRegex }];
    }
  }

  if (month) {
    matchQuery.$expr = {
      $eq: [{ $month: "$dateOfSale" }, parseInt(month, 10)],
    };
  }

  try {
    const count = await ProductTransaction.countDocuments(matchQuery);
    console.log("Match Query:", matchQuery); // Logging match query

    const transactions = await ProductTransaction.aggregate([
      { $match: matchQuery },
      { $skip: (page - 1) * per_page },
      { $limit: parseInt(per_page, 10) },
    ]).exec();

    res.json({
      total_count: count,
      page_number: parseInt(page, 10),
      per_page: parseInt(per_page, 10),
      transactions: transactions,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error.message, error.stack);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

// Define route for handling GET /transactions
router.get("/", transactionsHandler);

module.exports = router;
