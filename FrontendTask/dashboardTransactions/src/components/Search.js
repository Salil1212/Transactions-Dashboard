// src/components/Search.js
import React from "react";

const Search = ({ value, onChange }) => {
  return (
    <div>
      <label>Search Transactions: </label>
      <input type="text" value={value} onChange={onChange} />
    </div>
  );
};

export default Search;
