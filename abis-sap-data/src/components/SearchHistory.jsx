import React, { useEffect, useState } from "react";

const STORAGE_KEY = "abis_recent_searches";

const SearchHistory = ({ onSelect }) => {
  const [history, setHistory] = useState([]);

  // useEffect(() => {
  //   const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  //   setHistory(data);
  // }, []);

  useEffect(() => {
    const loadHistory = () => {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      setHistory(data);
    };

    loadHistory();

    window.addEventListener("abis-history-update", loadHistory);

    return() => {
      window.removeEventListener("abis-history-update", loadHistory);
    };
  }, []);

  if (!history.length) return null;

 return (
  <div className="recent-search-container">

    <div className="fw-semibold mb-2 text-muted px-1">
      Recent searches
    </div>

    <div className="recent-chip-wrapper">
      {history.map((item, idx) => {
        const dateRange =
          item.fromDate || item.toDate
            ? `${item.fromDate || "-"} → ${item.toDate || "-"}`
            : "";

        const label =
          item.vehicleNo
            ? `Vehicle No: ${item.vehicleNo}`
            : item.gateslipNo
            ? `Gate Slip: ${item.gateslipNo}`
            : item.searchText
            ? item.searchText
            : dateRange
            ? dateRange
            : "All Vehicles";

        return (
          <div
            key={idx}
            className="recent-chip"
            onClick={() => onSelect(item)}
          >
            <span className="recent-chip-text">{label}</span>

            <span
              className="recent-chip-close"
              title="Remove"
              onClick={(e) => {
                e.stopPropagation();
                const updated = history.filter((_, i) => i !== idx);
                localStorage.setItem(
                  STORAGE_KEY,
                  JSON.stringify(updated)
                );
                setHistory(updated);
              }}
            >
              ×
            </span>
          </div>
        );
      })}
    </div>
  </div>
);

};

export default SearchHistory;
