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
      location: "190aabfeacb7be739dbffb063f1d8264",
      fromDate: "",
      toDate: "",
      searchText: ""
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
      const filtered = prev.filter(
        item => JSON.stringify(item) !== JSON.stringify(filters)
      );
      const updated = [filters, ...filtered].slice(0, 5);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event("abis-history-update"));
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
        toDate: formatDate(filters.toDate),
        fromDate: formatDate(filters.fromDate),
        location_id: filters.location,
        vehicle_no: filters.vehicleNo,
        request_data: filters.searchText,
        gate_slip: filters.gateslipNo,
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

const filteredTableData = tableData.filter((row) => {
    const search = searchFilter.searchText?.trim().toLowerCase();
    if (!search) return true;

    let raw = {};
    try {
        raw = row.raw_data ? JSON.parse(row.raw_data) : {};
    } catch {
      raw = {};
    }

    if (search === "loading" || search === "unloading") {
      return raw.VEHTYPE?.toLowerCase() === search;
    }

    const rawString = JSON.stringify(raw).toLowerCase();
    return (
      row.vehicle_no?.toLowerCase().includes(search) ||
      rawString.includes(search)
    );
});



  return (
    <div className="App">
      <Header />
      <div className="container">
        <SearchHistory onSelect={handleHistorySelect} />
        <SearchFilter onSearch={fetchSapData}
          setSearchFilter={setSearchFilter}
          searchFilter={searchFilter}
        />
        <DataTable 
          data={filteredTableData} 
          loading={loading} 
          onView={openModal} />

         <Modal 
          show={showModal}
          onClose={closeModal}
          data={viewData}
        />

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

       

        
      </div>
    </div>
  );
}

export default App;
