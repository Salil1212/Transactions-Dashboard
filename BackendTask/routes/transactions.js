const express = require("express");
const router = express.Router();
const ProductTransaction = require("../models/ProductTransaction");

// GET /transactions
// API to list all transactions with search and pagination
async function transactionsHandler(req, res) {
  const { search = "", page = 1, per_page = 10 } = req.query;

  const query = {};

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { price: { $regex: search, $options: "i" } }, // assuming price can be searched as text
    ];
  }

  try {
    const count = await ProductTransaction.countDocuments(query);
    const transactions = await ProductTransaction.find(query)
      .skip((page - 1) * per_page)
      .limit(parseInt(per_page, 10))
      .exec();

    res.json({
      total_count: count,
      page_number: parseInt(page, 10),
      per_page: parseInt(per_page, 10),
      transactions: transactions,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Define route for handling GET /transactions
router.get("/", transactionsHandler);

module.exports = router;
