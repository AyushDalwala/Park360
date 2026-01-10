import React, { useEffect, useState } from "react";

const LocationTable = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSapData();
  }, []);

  const fetchSapData = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "http://192.168.0.114:8001/api/abis/sapdata",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
          },
          body: JSON.stringify({
            toDate: "01-01-2026",
            fromDate: "01-01-2026",
            location_id: "190aabfeacb7be739dbffb063f1d8264",
            vehicle_no: "",
            request_data: "",
            gate_slip: "",
            iColumns: 13,
            sColumns: ",,,,,,,,,,,",
            iDisplayStart: 0,
            iDisplayLength: 10,
            sEcho: 1,
          }),
        }
      );

      const json = await res.json();
      console.log("SAP RAW RESPONSE:", json);

      // ✅ STEP 1: extract correct array
      const records = json?.data?.data || [];

      if (!Array.isArray(records)) {
        throw new Error("SAP data is not array");
      }

      // ✅ STEP 2: parse raw_data JSON string
      const parsedRows = records.map((item) => {
        let parsed = {};

        try {
          parsed = JSON.parse(item.raw_data);
        } catch {
          parsed = {};
        }

        return {
          GATESLIP: parsed.GATESLIP || "-",
          VEHICLE: parsed.VEHICLE || item.vehicle_no || "-",
          DRIVER: parsed.DRIVERNAME || "-",
          PLANT: parsed.PLANT || "-",
          ENTRYDATE: parsed.ENTRYDATE || "-",
        };
      });

      setRows(parsedRows);
    } catch (err) {
      console.error("SAP API ERROR:", err);
      setError("Failed to load SAP data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3>SAP Location Data</h3>

      {loading && <div className="muted">Loading SAP data...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}

      {!loading && rows.length === 0 && (
        <div className="muted">No SAP records found</div>
      )}

      {rows.length > 0 && (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Gate Slip</th>
                <th>Vehicle</th>
                <th>Driver</th>
                <th>Plant</th>
                <th>Entry Date</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>{row.GATESLIP}</td>
                  <td>{row.VEHICLE}</td>
                  <td>{row.DRIVER}</td>
                  <td>{row.PLANT}</td>
                  <td>{row.ENTRYDATE}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LocationTable;
