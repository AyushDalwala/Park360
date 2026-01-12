import React from 'react';

const DataTable = ({ data, loading, onView }) => {

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

  return (
    <div className='shadow-sm p-3 bg-white rounded'>
        <h5>SAP Location Data</h5>

        <table className='table table-bordered table-striped mt-3'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Vehichle No</th>
                    <th>Gate Slip</th>
                    <th>Driver</th>
                    <th>Plant</th>
                    <th>Entry Date</th>
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
                                <td>{row.id}</td>
                                <td>{row.vehicle_no ?? "-"}</td>
                                <td>{raw.GATESLIP ?? "-"}</td>
                                <td>{raw.DRIVERNAME ?? "-"}</td>
                                <td>{raw.PLANT ?? "-"}</td>
                                <td>{row.created_at ? row.created_at.replace("T", " ").split(".")[0] : "-"}</td>
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
                        <td colSpan="7" className='text-center'>
                            No Data Found
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
  );
};

export default DataTable;
