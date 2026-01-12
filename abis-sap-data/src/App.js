import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import SearchFilter from './components/SearchFilter';
import DataTable from './components/DataTable';
import Pagination from './components/Pagination';
import Modal from './components/Modal';
import SearchHistory from './components/SearchHistory';
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

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);

    const [showModal, setShowModal] = useState(false);
    const [viewData, setViewData] = useState(null);


    const STORAGE_KEY = "abis_recent_searches";

    const saveSearchToHistory = (filters) => {
    const prev = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    // remove duplicate searches
    const filtered = prev.filter(
    item => JSON.stringify(item) !== JSON.stringify(filters)
    );

    const updated = [filters, ...filtered].slice(0, 5);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

  const getSearchHistory = () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  };


    const openModal = (rawData) => {
      try {
          setViewData(JSON.parse(rawData));
      } catch {
        setViewData({});
      }
      setShowModal(true);
      
    }

    const closeModal = () => {
      setShowModal(false);
      setViewData(null);
    }

    const handleHistorySelect = (filters) => {
      setSearchFilter(filters);
      fetchSapData(filters, false, 1, pageSize);
    };


    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      const [yyyy, mm, dd] = dateStr.split("-");
      return `${dd}-${mm}-${yyyy}`;
    };


    const fetchSapData = async (
      filters = searchFilter, isClear = false, page = 1, size = pageSize) => {

      if (isClear){
        setTableData([]);
        setTotalRecords(0);
        setCurrentPage(1);
        return;
      }

      // if (!searchFilter.location) {
      //   alert("Location is required");
      //   return;
      // }

      if (page === 1) {
        saveSearchToHistory(filters);
      }

      setLoading(true);

      const payload = {
        toDate: formatDate(searchFilter.toDate),
        fromDate: formatDate(searchFilter.fromDate),
        location_id: searchFilter.location,
        vehicle_no: searchFilter.vehicleNo,
        request_data: "",
        gate_slip: searchFilter.gateslipNo,
        iColumns: 13,
        sColumns: ",,,,,,,,,,,",
        iDisplayStart: (page - 1) * size,
        iDisplayLength: size,
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
          setTotalRecords(result.data.totalRecords || 0);
          setCurrentPage(page);
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
        <DataTable data={tableData} loading={loading} onView={openModal} />

        <Pagination
          currentPage={currentPage}
          totalRecords={totalRecords}
          pageSize={pageSize}
          onPageChange={(page) => fetchSapData(searchFilter, false, page, pageSize)}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
            fetchSapData(searchFilter, false, 1, size);
          }}
        />

        <Modal 
          show={showModal}
          onClose={closeModal}
          data={viewData}
        />

        <SearchHistory onSelect={handleHistorySelect} />
      </div>
    </div>
  );
}

export default App;
