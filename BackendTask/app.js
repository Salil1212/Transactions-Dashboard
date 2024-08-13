const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const transactionsRouter = require("./routes/transactions");
const statisticsRouter = require("./routes/statistics");
const chartsRouter = require("./routes/charts");
const combinedRouter = require("./routes/combined");
const cors = require("cors");
const { configDotenv } = require("dotenv");
const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.json());

mongoose
  .connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/transactions", transactionsRouter);
app.use("/statistics", statisticsRouter); // Make sure this line is present
app.use("/charts", chartsRouter);
app.use("/combined", combinedRouter);

app.get("/", (req, res) => {
  res.json("This is dashboard");
});
app.get("/home", (req, res) => {
  res.json("This is home page");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
