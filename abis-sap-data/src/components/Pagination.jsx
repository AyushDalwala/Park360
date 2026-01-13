import React from "react";

const Pagination = ({
  currentPage,
  totalRecords,
  pageSize,
  onPageChange,
  onPageSizeChange
}) => {
  if (totalRecords === 0) return null;

  const totalPages = Math.ceil(totalRecords / pageSize);

  const startRecord = (currentPage - 1) * pageSize + 1;
  const endRecord = Math.min(currentPage * pageSize, totalRecords);

  const pages = [];
  let lastPage = 0;

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      Math.abs(i - currentPage) <= 1
    ) {
      if (lastPage && i - lastPage > 1) {
        pages.push({
          type: "ellipsis",
          target: lastPage + 1
        });
      }
      pages.push({
        type: "page",
        value: i
      });
      lastPage = i;
    }
  }

  return (
    <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
      {/* 🔽 PAGE SIZE */}
      <div className="d-flex align-items-center gap-2">
        <select
          className="form-select form-select-sm"
          style={{ width: "80px" }}
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        >
          {[10, 20, 30, 40, 50, 100].map(size => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        <span className="text-muted">
          Results: {startRecord} – {endRecord} of {totalRecords}
        </span>
      </div>

      {/* 🔢 PAGINATION */}
      <ul className="pagination mb-0">
        {/* PREVIOUS */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
          >
            ‹
          </button>
        </li>
        
        {pages.map((item, idx) => 
          item.type === "ellipsis" ? (
            <li key={idx} className="page-item">
              <button
                className="page-link"
                onClick={() => onPageChange(item.target)}
              >...</button>
            </li>
          ) : (
            <li
              key={idx}
              className={`page-item ${item.value === currentPage ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => onPageChange(item.value)}
                >
                  {item.value}
                </button>
            </li>
          )
        )}

        {/* NEXT */}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
          >
            ›
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
