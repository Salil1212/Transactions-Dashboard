// src/components/ChartSection.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";

const ChartSection = ({ month }) => {
  const [barChartData, setBarChartData] = useState({});
  const [pieChartData, setPieChartData] = useState({});

  useEffect(() => {
    fetchBarChartData();
    fetchPieChartData();
  }, [month]);

  const fetchBarChartData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/charts/bar-chart?month=${month}`
      );
      const labels = response.data.map((item) => item._id);
      const data = response.data.map((item) => item.count);

      setBarChartData({
        labels,
        datasets: [
          {
            label: "Number of Items",
            data,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching bar chart data:", error);
    }
  };

  const fetchPieChartData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/charts/pie-chart?month=${month}`
      );
      const labels = response.data.map((item) => item._id);
      const data = response.data.map((item) => item.count);

      setPieChartData({
        labels,
        datasets: [
          {
            label: "Number of Items",
            data,
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#FF9F40",
              "#4BC0C0",
              "#9966FF",
              "#FF6384",
            ],
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching pie chart data:", error);
    }
  };

  return (
    <div>
      <h2>Charts</h2>
      <div>
        <h3>Bar Chart</h3>
        <Bar data={barChartData} />
      </div>
      <div>
        <h3>Pie Chart</h3>
        <Pie data={pieChartData} />
      </div>
    </div>
  );
};

export default ChartSection;
