import React from 'react';

const DataTable = ({ data, loading, onView }) => {

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

//     const formatDate = (dateStr) => {
//   if (!dateStr) return "-";
//   const date = new Date(dateStr);
//   const dd = String(date.getDate()).padStart(2, "0");
//   const mm = String(date.getMonth() + 1).padStart(2, "0");
//   const yyyy = date.getFullYear();
//   return `${dd}-${mm}-${yyyy}`;
// };


  return (
    <div className='p-3 bg-white'>
        <h5>SAP Location Data</h5>
        <div className="SrTableWrapper">
        <table className='shadow-sm rounded table table-bordered table-striped mt-3'>
            <thead>
                <tr>
                    <th>SR No.</th>
                    <th>Vehichle No</th>
                    <th>Vehicle Type</th>
                    <th>Gate Slip</th>
                    <th>Driver</th>
                    <th>Plant</th>
                    <th>Gatepass Count</th>
                    <th>Entry Date & Time</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                {data && data.length > 0 ? (
                    data.map((row, index) => 
                    {
                        let raw = {};
                        try {
                            raw = row.raw_data ? JSON.parse(row.raw_data) : {};
                        } catch (e) {
                            raw = {};
                        }
                    
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{row.vehicle_no ?? "-"}</td>
                                <td>{raw.VEHTYPE ?? "-"}</td>
                                <td>{raw.GATESLIP ?? "-"}</td>
                                <td>{raw.DRIVERNAME ?? "-"}</td>
                                <td>{raw.PLANT ?? "-"}</td>
                                <td>{raw.GATEPASS_ITEM.length}</td>
                                <td>
                                    {raw.ENTRYDATE ? raw.ENTRYDATE.replace("T", " ").split(".")[0] : "-"}
                                    &nbsp;&nbsp;
                                    {raw.ENTRYTIME ? raw.ENTRYTIME.replace("T", " ").split(".")[0] : "-"}</td>
                                <td>
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => onView(row.raw_data)}
                                        >View</button>
                                </td>
                            </tr>
                        ); 
                    })
                ) : (
                    <tr>
                        <td colSpan="9" className='text-center'>
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
