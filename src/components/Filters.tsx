import React, { useState } from "react";
import SearchImg from "../assets/search.png";
import { camelToTitleCase } from "../lib/utility";

type PropTypes = {
  filters: Record<string, string[]>;
  setSelectQuery: React.Dispatch<React.SetStateAction<string>>;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setQueryName?: React.Dispatch<React.SetStateAction<string>>;
};

const Filters = ({
  filters,
  setSelectQuery,
  setPageSize,
  setSearchQuery,
  setQueryName,
}: PropTypes) => {
  const [activateSearch, setActivateSearch] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query); // This will now update the parent component
  };

  return (
    <div className="flex items-center divide-x-4 divide-as-gray mx-3 mt-5">
      <div className="px-3 first:pl-0 last:pr-0 flex items-center gap-1">
        <select
          defaultValue={5}
          onChange={(e) => setPageSize(parseInt(e.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
        <span>Entries</span>
      </div>
      <div
        onClick={() => setActivateSearch(true)}
        className="px-3 first:pl-0 last:pr-0 flex gap-2 items-center"
      >
        <img src={SearchImg} alt="search" className="h-4" />
        <input
          onChange={handleSearch}
          type="text"
          placeholder="Search..."
          className="border-b outline-none border-as-black transition-all duration-500"
          style={{ width: activateSearch ? "150px" : "0px" }}
        />
      </div>
      <div className="px-3 first:pl-0 last:pr-0 flex gap-3.5 items-center">
        {Object.keys(filters).map((filter) => (
          <div key={`filter-${filter}`} className="flex items-center gap-1">
            <span>{camelToTitleCase(filter)}</span>
            <select
              onChange={(e) => {
                if (e.target.value === "all") {
                  return setSelectQuery("");
                }
                if (setQueryName) setQueryName(filter);
                setSelectQuery(e.target.value);
              }}
            >
              <option value="all">All</option>
              {filters[filter].map((f) => (
                <option key={`cat-${f}`} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;
