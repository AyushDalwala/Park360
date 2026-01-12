import React, { useEffect, useState } from "react";

const STORAGE_KEY = "abis_recent_searches";

const SearchHistory = ({ onSelect }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    setHistory(data);
  }, []);

  if (!history.length) return null;

  return (
    <div
      className="position-absolute"
      style={{
        top: "97px", // move it just below the header/form
        left: "10px", // align with form's left
        zIndex: 1050, // make sure it is above other content
        width: "180px",
      }}
    >
      <div className="card shadow-sm">
        <div className="card-header fw-semibold">Vehicle History</div>
        <ul className="list-group list-group-flush">
          {history.map((item, idx) => (
            <li
              key={idx}
              className="list-group-item list-group-item-action"
              style={{ cursor: "pointer" }}
              onClick={() => onSelect(item)}
            >
              <div className="fw-bold">
                 {item.vehicleNo || "-"} {item.gateslipNo ? `| ${item.gateslipNo}` : ""}
              </div>
              <small className="text-muted">
                {item.fromDate || "-"} → {item.toDate || "-"}
              </small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchHistory;
