import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ data }) => {
  console.log("BarChart Data:", data); // Add this line to log the data

  const chartData = {
    labels: data.map((item) => item._id),
    datasets: [
      {
        label: "Number of Items",
        data: data.map((item) => item.count),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true, // Ensure the y-axis starts from 0
        ticks: {
          stepSize: 1, // Increment by 1
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Number of Items by Price Range",
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
