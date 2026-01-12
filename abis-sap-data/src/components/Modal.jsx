import React from "react";

const Modal = ({ show, onClose, data }) => {
  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">SAP Raw Data</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          {/* <div className="modal-body">
            <pre style={{ maxHeight: "400px", overflow: "auto" }}>
              {JSON.stringify(data, null, 2)}
            </pre>
          </div> */}

          <div className="modal-body" style={{ maxHeight: "400px", overflowY: "auto" }}>
  <table className="table table-bordered table-striped">
    <thead>
      <tr>
        <th>Key</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      {data && typeof data === "object" ? (
        Object.entries(data).map(([key, value], idx) => (
          <tr key={idx}>
            <td>{key}</td>
            <td>
              {typeof value === "object"
                ? JSON.stringify(value, null, 2)
                : String(value)}
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="2" className="text-center">No Data Available</td>
        </tr>
      )}
    </tbody>
  </table>
</div>


          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Modal;
