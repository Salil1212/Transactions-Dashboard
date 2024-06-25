MERN Stack Coding Challenge

     Overview

This project implements a MERN (MongoDB, Express, React, Node.js) stack application that fetches product transaction data from a third-party API, initializes a database with this data, and provides various APIs to interact with and visualize the data. The frontend displays transactions, statistics, and visualizations such as bar charts and pie charts based on user-selected months.

     Features

- Initialize Database : Fetches data from a third-party API and seeds the MongoDB database.
- List Transactions : Lists transactions with search and pagination support.
- Statistics API : Provides total sale amount, total sold items, and total not sold items for a selected month.
- Bar Chart API : Returns data for a bar chart showing the number of items in price ranges for a selected month.
- Pie Chart API : Returns data for a pie chart showing the number of items per category for a selected month.
- Combined Data API : Fetches and combines data from various APIs.

  Frontend

- Transactions Table : Displays transactions with search and pagination.
- Statistics Display : Shows total sales, sold items, and not sold items.
- Bar Chart : Visualizes the number of items in different price ranges.
- Pie Chart : Visualizes the number of items per category.

  Usage

1.  Select a Month : Use the dropdown to filter data by month.
2.  Search Transactions : Filter transactions by title, description, or price.
3.  Navigate Pages : Use pagination buttons to view more transactions.
4.  View Statistics : See total sales, sold items, and not sold items.
5.  Analyze Charts : Explore bar and pie charts for data insights.
