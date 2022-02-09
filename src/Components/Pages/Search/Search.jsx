import React from "react";
import Searchedproducts from "./SearchedProducts";
import Sidebar from "./Sidebar";

function Search({ isFilter = false }) {
  return (
    <div className="d-flex flex-wrap">
      <Sidebar />
      <Searchedproducts isFilter={isFilter} />
    </div>
  );
}

export default Search;
