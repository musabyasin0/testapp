import React from "react";

function Search({ search, setSearch }) {
  return (
    <>
      <form className="searchItem" onSubmit={(e) => e.preventDefault()}>
        <input
          className="searchKey"
          id="searchKey"
          placeholder="Search Item .."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
    </>
  );
}

export default Search;
