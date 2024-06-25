import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto"; // Make sure to import 'auto' version of Chart.js

const PieChart = ({ data }) => {
  console.log("PieChart:", data);
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy(); // Cleanup existing chart instance
    }

    // Initialize new chart instance
    if (chartContainer.current && data) {
      const ctx = chartContainer.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "pie",
        data: {
          labels: data.map((item) => item._id),
          datasets: [
            {
              label: "Categories",
              data: data.map((item) => item.count),
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#8A2BE2",
                "#00FF00",
                "#FF00FF",
                "#0000FF",
                "#FF4500",
                "#DC143C",
                "#000000",
              ],
              hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#8A2BE2",
                "#00FF00",
                "#FF00FF",
                "#0000FF",
                "#FF4500",
                "#DC143C",
                "#000000",
              ],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // Ensures the chart is not constrained by its parent container
          aspectRatio: 1, // Aspect ratio of 1:1 (square)
          plugins: {
            legend: {
              position: "bottom", // Position of the legend
            },
          },
        },
      });
    }

    // Cleanup chart instance on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <canvas
      ref={chartContainer}
      style={{ maxWidth: "20vw", maxHeight: "20vw" }}
    />
  );
};

export default PieChart;
