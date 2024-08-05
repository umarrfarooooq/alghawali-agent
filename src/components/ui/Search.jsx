import { useTranslations } from "next-intl";
import React, { useState, useCallback } from "react";
import debounce from "lodash/debounce";

const Search = ({ onSearch }) => {
  const t = useTranslations("HomePage");
  
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useCallback(
    debounce((value) => onSearch(value), 500),
    []
  );

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <span className="search-box-destination flex items-center md:mt-0 lg:mt-0 py-3 px-2 rounded-[0.5rem] bg-[#F4F1EB] lg:min-w-[37rem] border border-[#C3D0D4]">
      <svg
        className="mr-2 inline-block"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
          stroke="#8C979C"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20.9992 21.0002L16.6992 16.7002"
          stroke="#8C979C"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <input
        type="text"
        placeholder={t("search")}
        value={searchTerm}
        onChange={handleChange}
        className="sm:flex-1 border-none outline-none bg-transparent md:w-full min-w-[5rem] max-w-[10rem] sm:min-w-[90%]"
      />
    </span>
  );
};

export default Search;
