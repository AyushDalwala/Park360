import React from 'react';

const DataTable = ({ data }) => {
  return (
    <div className="data-table shadow-sm p-3 bg-white rounded">
      <h5>SAP Location Data</h5>
      <div className="table-responsive">
        <table className="table table-striped table-bordered mt-3">
          <thead className="table-light">
            <tr>
              <th>Gate Slip</th>
              <th>Vehicle</th>
              <th>Driver</th>
              <th>Plant</th>
              <th>Entry Date</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, index) => (
                <tr key={index}>
                  <td>{row.gateSlip}</td>
                  <td>{row.vehicle}</td>
                  <td>{row.driver}</td>
                  <td>{row.plant}</td>
                  <td>{row.entryDate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
