// SearchBar.js
import React, { useState } from "react";
import { TextField } from "@mui/material";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <TextField
      label="Search"
      variant="outlined"
      fullWidth
      margin="normal"
      value={searchTerm}
      onChange={handleSearch}
    />
  );
};

export default SearchBar;