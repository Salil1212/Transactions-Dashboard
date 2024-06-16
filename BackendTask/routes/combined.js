const express = require("express");
const router = express.Router();
const axios = require("axios");

async function combinedHandler(req, res) {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ message: "Month parameter is required" });
  }

  try {
    const [
      transactionsResponse,
      statisticsResponse,
      barChartResponse,
      pieChartResponse,
    ] = await Promise.all([
      axios.get(`http://localhost:3000/transactions?month=${month}`),
      axios.get(`http://localhost:3000/statistics?month=${month}`),
      axios.get(`http://localhost:3000/charts/bar-chart?month=${month}`),
      axios.get(`http://localhost:3000/charts/pie-chart?month=${month}`),
    ]);

    const combinedData = {
      transactions: transactionsResponse.data,
      statistics: statisticsResponse.data,
      bar_chart: barChartResponse.data,
      pie_chart: pieChartResponse.data,
    };

    res.json(combinedData);
  } catch (error) {
    console.error("Error fetching combined data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

router.get("/", combinedHandler);

module.exports = router;
