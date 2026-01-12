import React, { useState, useEffect } from 'react';
import { FaSearch, FaRedo } from 'react-icons/fa';



const SearchFilter = ({ onSearch, searchFilter, setSearchFilter }) => {
  const [vehicle, setVehicle] = useState('');
  const [gate, setGate] = useState('');
  
  
  const [location, setLocation] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showLocationModal, setShowLocationModal] = useState(false);

    //console.log("showLocationModal:", showLocationModal);

  useEffect(() => {
    fetch("http://192.168.0.9:8001/api/master/locationList", {
      method: "GET",
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYXN0ZXJfaWQiOjEsIm1hc3RlciI6eyJpZCI6MSwiaGFzaGNvZGUiOiI0OWJmNGZiNTRiNjBmMTA3YTU1NGU1OTllMTE1ZWFiYyIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJpc19zdXBlcmFkbWluIjp0cnVlLCJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6IiQyYiQxMCRVRUNMUFBYRmswYXY2SC5HVmZsVmFlRDB3NklEWWd0RXoxajRTQnluTkRkTGZ5TkpWcEtOeSIsImZvcmNlX3Jlc2V0X3Bhc3N3b3JkIjpmYWxzZX0sImlzX21hc3RlciI6dHJ1ZSwiaWF0IjoxNzY4MTk0NTQ3LCJleHAiOjE3NjgyODA5NDd9.Goe2bEo5RLwhF8FlQcQbtw1nBV6rYr5jD7IA67ZyXOY"
      }
    })
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        setLocation(res.data);
      }
    })
    .catch(err => console.error("Location API error: ", err));
  }, []);

  const handleSearch = () => {
    onSearch({ vehicle, gate, location: selectedLocation });
  };

  const handleClear = () => {
    const clearedFilters = {
        ...searchFilter,
        vehicleNo: "",
        gateslipNo: "",
        fromDate: "",
        toDate: "",
        searchText: ""
    };
    setSearchFilter(clearedFilters);
    onSearch(clearedFilters, false);
  };

  return (
    <>
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <div className="row g-3 align-items-end">

        {/* Location */}
          {/* <div className="col-md-3">
            <label className="form-label fw-semibold">Location</label>
            <select
              className="form-select"
              value={searchFilter.location}
              onChange={(e) =>
                setSearchFilter({ ...searchFilter, location: e.target.value })
              }
            >
              <option value="">Select location</option>
              {location.map(loc => (
                <option key={loc.hashcode} value={loc.hashcode}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div> */}

          {/* Vehicle No */}
          <div className="col-md-3">
            <label className="form-label fw-semibold">Vehicle No</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter vehicle number"
              value={searchFilter.vehicleNo}
              onChange={(e) =>
                setSearchFilter({ ...searchFilter, vehicleNo: e.target.value })
              }
            />
          </div>

          {/* Gate Slip */}
          <div className="col-md-3">
            <label className="form-label fw-semibold">Gate Slip No</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter gate slip number"
              value={searchFilter.gateslipNo}
              onChange={(e) =>
                setSearchFilter({ ...searchFilter, gateslipNo: e.target.value })
              }
            />
          </div>

          

        <div className="col-md-3">
            <label className="form-label fw-semibold">Search</label>
            <input
              type="text"
              className="form-control"
              placeholder="Search ...."
              value={searchFilter.searchText}
              onChange={(e) =>
                setSearchFilter({ ...searchFilter, searchText: e.target.value })
              }
            />
          </div>

          <div className="col-md-3">

          </div>

            {/* From Date */}
          <div className="col-md-3">
            <label className="form-label fw-semibold">From Date</label>
            <input
              type="date"
              className="form-control"
              value={searchFilter.fromDate || ""}
              onChange={(e) =>
                setSearchFilter({ ...searchFilter, fromDate: e.target.value, toDate: "" })
              }
            />
          </div>

          {/* To Date */}
          <div className="col-md-3">
            <label className="form-label fw-semibold">To Date</label>
            <input
              type="date"
              className="form-control"
              value={searchFilter.toDate || ""}
              min={searchFilter.fromDate}
              disabled={!searchFilter.fromDate}
              onChange={(e) =>
                setSearchFilter({ ...searchFilter, toDate: e.target.value })
              }
            />
          </div>
        
        <div className="col-12 d-flex justify-content-end gap-2">

          {/* Buttons */}
          <div className="col-md-3 d-flex gap-2">
            <button
              className="btn btn-primary w-100"
              onClick={() => { 
                // if (!searchFilter.location) {
                //   setShowLocationModal(true);
                //   return;
                // }
                onSearch(searchFilter)}}
            >
              <FaSearch /> Search
            </button>
            <button
              className="btn btn-outline-secondary w-100"
              onClick={handleClear}
            >
              <FaRedo /> Clear
            </button>
          </div>
        </div>

        </div>
      </div>
    </div>

      {/* 🔔 Location Required Modal */}
{showLocationModal && (
  <>
    {/* Backdrop */}
    <div className="modal-backdrop fade show"></div>

    {/* Modal */}
    <div className="custom-alert-modal">
      <div className="custom-alert-content">
        <div className="custom-alert-header">
          <span className="fw-semibold">Alert</span>
          <button
            className="btn-close"
            onClick={() => setShowLocationModal(false)}
          ></button>
        </div>

        <div className="custom-alert-body">
          <p className="text-danger fw-semibold mb-0">
            Location is compulsory
          </p>
        </div>

        <div className="custom-alert-footer">
          <button
            className="btn btn-danger btn-sm"
            onClick={() => setShowLocationModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </>
)}


    </>
  );
};

export default SearchFilter;
