const mongoose = require("mongoose");
const axios = require("axios");
const ProductTransaction = require("../models/ProductTransaction");

const mongoURI = "mongodb://localhost:27017/productTransactions";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

async function fetchAndSeedData() {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const data = response.data;

    await ProductTransaction.deleteMany({});

    for (let item of data) {
      const transaction = new ProductTransaction({
        title: item.title,
        description: item.description,
        price: item.price,
        dateOfSale: new Date(item.dateOfSale),
        sold: item.sold,
        category: item.category,
        image: item.image,
      });
      await transaction.save();
    }

    console.log("Database seeded successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

fetchAndSeedData();
