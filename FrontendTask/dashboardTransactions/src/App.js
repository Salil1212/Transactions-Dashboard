import React, { useState, useEffect } from "react";
import axios from "axios";
import TransactionsTable from "./components/TransactionsTable";
import Search from "./components/Search";
import Pagination from "./components/Pagination";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";

const App = () => {
  const [month, setMonth] = useState("3"); // Default to March
  const [search, setSearch] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:3000/transactions", {
        params: { month, search, page },
      });

      setTransactions(response.data.transactions);
      setTotalPages(
        Math.ceil(response.data.total_count / response.data.per_page)
      );
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const fetchBarChartData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/charts/bar-chart",
        {
          params: { month },
        }
      );

      setBarChartData(response.data);
    } catch (error) {
      console.error("Error fetching bar chart data:", error);
    }
  };

  const fetchPieChartData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/charts/pie-chart",
        {
          params: { month },
        }
      );
      setPieChartData(response.data);
    } catch (error) {
      console.error("Error fetching pie chart data:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, search, page]);

  useEffect(() => {
    fetchBarChartData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month]);
  useEffect(() => {
    fetchPieChartData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month]);
  const handleMonthChange = (event) => {
    const selectedMonth = event.target.value;
    setMonth(selectedMonth);
    setPage(1); // Reset to first page
  };

  const handleSearchChange = (event) => {
    const searchText = event.target.value;
    setSearch(searchText);
    setPage(1); // Reset to first page
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="App">
      <h1>Transactions Dashboard</h1>
      <div>
        <label>Select Month: </label>
        <select value={month} onChange={handleMonthChange}>
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].map(
            (m) => (
              <option key={m} value={m}>
                {new Date(0, m - 1).toLocaleString("default", {
                  month: "long",
                })}
              </option>
            )
          )}
        </select>
      </div>
      <Search value={search} onChange={handleSearchChange} />
      <TransactionsTable transactions={transactions} />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <BarChart data={barChartData} />
      <PieChart data={pieChartData} />
    </div>
  );
};

export default App;
// This is updated code