import React from "react";

const Modal = ({ show, onClose, data }) => {
  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-xl modal-dialog-centered" style={{maxWidth: "95%"}}>
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

          <div className="modal-body" style={{ maxHeight: "72vh", overflowY: "auto" }}>
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th style={{width: "30%"}}>Key</th>
                  <th>Value</th>
                </tr>
               </thead>
                <tbody>
                  {data && typeof data === "object" ? (
                    Object.entries(data).map(([key, value], idx) => {
                      if (key === "GATEPASS_ITEM" && Array.isArray(value)) {
                      return null;
                    }

                    return (
                      <tr key={idx}>
                        <td>{key}</td>
                        <td>
                          {typeof value === "object"
                            ? JSON.stringify(value, null ,2)
                            : String(value)
                          }
                        </td>
                      </tr>
                    )
                  })
                  ) : (
                    <tr>
                      <td colSpan="2" className="text-center">No Data Available</td>
                    </tr>
                  )}
                </tbody>
              </table>

           

                {/* GATEPASS ITEM SECTION – CARD STYLE */}
                {Array.isArray(data?.GATEPASS_ITEM) && (
                  <>
                    <h6 className="fw-bold mt-4 mb-3">GATEPASS ITEM Details</h6>

                    <div className="row g-3">
                      {data.GATEPASS_ITEM.map((item, index) => (
                      <div className="col-md-6" key={index}>
                        <div className="border rounded p-3 h-100 bg-light">

                        {/* Card Header */}
                          <div className="fw-semibold mb-2">
                            Gatepass Item {index + 1}
                          </div>

                      {/* Key–Value rows */}
                      {Object.entries(item).map(([key, value], i) => (
                        <div
                          key={i}
                          className="d-flex justify-content-between py-1 border-bottom"
                          style={{ fontSize: "14px" }}
                        >
                          <div className="text-muted">{key}</div>
                          <div className="fw-medium text-end">
                            {value !== "" ? String(value) : "-"}
                          </div>
                        </div>
                      ))}

              </div>
        </div>
      ))}
    </div>
  </>
)}


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
