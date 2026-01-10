import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import SearchFilter from './components/SearchFilter';
import DataTable from './components/DataTable';
import './App.css';

function App() {
    const [searchFilter, setSearchFilter] = useState({
      vehicleNo: "",
      gateslipNo: "",
      location: "",
      fromDate: "",
      toDate: ""
    });

    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchSapData = async (filters = searchFilter, isClear = false) => {

      if (isClear){
        setTableData([]);
        return;
      }

      // if (!searchFilter.location) {
      //   alert("Location is required");
      //   return;
      // }

      setLoading(true);

      const payload = {
         toDate: searchFilter.toDate,
        fromDate: searchFilter.fromDate,
        location_id: searchFilter.location,
        vehicle_no: searchFilter.vehicleNo,
        request_data: "",
        gate_slip: searchFilter.gateslipNo,
        iColumns: 13,
        sColumns: ",,,,,,,,,,,",
        iDisplayStart: 0,
        iDisplayLength: 10,
        sEcho: 1
      };

      try {
        const response = await fetch (
           "http://192.168.0.114:8001/api/abis/sapdata",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
          }
        );

        const result = await response.json();
        console.log("API response: ", result);

        if (Array.isArray(result.data?.data)) {
          setTableData(result.data.data);
        } else {
          setTableData([]);
        }
         
      } catch (error) {
        console.error("SAP API Error: ", error);
        setTableData([]);
      } finally {
        setLoading(false);
      }
     
    };

    useEffect(() => {
      fetchSapData();
    }, []);

  return (
    <div className="App">
      <Header />
      <div className="container">
        <SearchFilter onSearch={fetchSapData}
          setSearchFilter={setSearchFilter}
          searchFilter={searchFilter}
        />
        <DataTable data={tableData} loading={loading} />
      </div>
    </div>
  );
}

export default App;
