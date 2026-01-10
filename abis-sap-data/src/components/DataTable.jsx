import React from 'react';

const DataTable = ({ data, loading }) => {

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

  return (
    <div className='shadow-sm p-3 bg-white rounded'>
        <h5>SAP Location Data</h5>

        <table className='table table-bordered table-striped mt-3'>
            <thead>
                <tr>
                    <th>Gate Slip</th>
                    <th>Vehichle</th>
                    <th>Driver</th>
                    <th>Plant</th>
                    <th>Entry Date</th>
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
                                <td>{raw.GATESLIP ?? "-"}</td>
                                <td>{row.vehicle_no ?? "-"}</td>
                                <td>{raw.DRIVERNAME ?? "-"}</td>
                                <td>{raw.PLANT ?? "-"}</td>
                                <td>{row.created_at ?? "-"}</td>
                            </tr>
                        ); 
                    })
                ) : (
                    <tr>
                        <td colSpan="5" className='text-center'>
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
