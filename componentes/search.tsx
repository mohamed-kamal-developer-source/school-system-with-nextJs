"use client";
import { useState, useEffect } from "react";
import useDebounce from "../utils/useDebounce";

export default function Search({ onSearch }) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 350);

  useEffect(() => {
    if (debouncedQuery.trim() === "") return;
    onSearch(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}