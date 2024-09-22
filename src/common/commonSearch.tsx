import React, { useState } from "react";
import { Button as BaseButton } from "@mui/material";
import { t } from "@/utils/translation";

interface SearchElementProps {
  label: string;
  placeholder?: string;
  onSearch: (searchTerm: string) => void;
}

const CommonSearch: React.FC<SearchElementProps> = ({
  label,
  placeholder = "Search...",
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearch}>
      <div className=" flex w-full flex-row items-center space-x-2">
        <input
          required
          type="text"
          id="search"
          className="font-sans focus:shadow-outline-primary dark:focus:shadow-outline-primary mr-2 flex-grow rounded-lg border border-solid border-slate-300 bg-white px-3 py-2 text-sm font-normal leading-5 text-slate-900 shadow-md shadow-slate-100 focus:border-primary focus:shadow-lg focus-visible:outline-0 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300 dark:shadow-slate-900 dark:focus:border-primary"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <BaseButton
          type="submit"
          style={{
            textTransform: "none",
            backgroundColor: "#0097B2",
            color: "white",
            padding: "4px 6px",
            // borderRadius: "0.5rem",
          }}
        >
          {t("common.search")}
        </BaseButton>
      </div>
    </form>
  );
};

export default CommonSearch;
