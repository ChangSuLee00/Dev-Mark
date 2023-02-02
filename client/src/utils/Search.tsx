import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";

// Interfaces
interface P {
  search: string;
}

// React Start from here
const Search: FC<P> = (props: P): JSX.Element => {
  //--------------------------------------------------------
  // return

  return (
    <form className="search-flex">
      <input
        className="search-form form-control bg-light border-0"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
      <button className="btn btn-outline-* btn-search" type="submit">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </form>
  );
};

export default Search;
