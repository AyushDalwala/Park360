import { FaHistory, FaSearch, FaTimes } from "react-icons/fa";
import { useEffect, useState} from "react";

const VEHICE_KEY = "abis_vehicle_recent";
const GATESLIP_KEY = "abis_gateslip_recent";

const SearchBar = ({
    vehicleNo,
    setVehicleNo,
    productNo,
    setProductNo,
    onVehicleSearch,
    onProductSearch,
    setSapData
}) => {

  const [vehicleRecent, setVehicleRecent] = useState([]);
  const [gateslipRecent, setGatesSlipRecent] = useState([]);

  const [showVehicleRecent, setShowVehicleRecent] = useState(false);
  const [showGatesSlipRecent, setShowGatesSlipRecent] = useState(false);

  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setVehicleRecent(JSON.parse(localStorage.getItem(VEHICE_KEY)) || []);
    setGatesSlipRecent(JSON.parse(localStorage.getItem(GATESLIP_KEY)) || []);
  }, []);

  useEffect(() => {
    fetch("http://192.168.0.9:8001/api/master/locationList", {
      method: "GET",
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYXN0ZXJfaWQiOjEsIm1hc3RlciI6eyJpZCI6MSwiaGFzaGNvZGUiOiI0OWJmNGZiNTRiNjBmMTA3YTU1NGU1OTllMTE1ZWFiYyIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJpc19zdXBlcmFkbWluIjp0cnVlLCJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6IiQyYiQxMCRVRUNMUFBYRmswYXY2SC5HVmZsVmFlRDB3NklEWWd0RXoxajRTQnluTkRkTGZ5TkpWcEtOeSIsImZvcmNlX3Jlc2V0X3Bhc3N3b3JkIjpmYWxzZX0sImlzX21hc3RlciI6dHJ1ZSwiaWF0IjoxNzY4MDI2NzQwLCJleHAiOjE3NjgxMTMxNDB9.6KUUKofRroE0JpEtJRtiM_0twQtfTOoCn2KBvjFWUxc"
      }
    })
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        setLocations(res.data);
      }
    })
    .catch(err => console.error("Location API error: ", err));
  }, []);

  const handleLocationSearch = () => {
  if (!selectedLocation) {
    alert("Please select a location");
    return;
  }

  setLoading(true);
//  setHasSearched(true);

  fetch("http://192.168.0.114:8001/api/abis/sapdata", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYXN0ZXJfaWQiOjEsIm1hc3RlciI6eyJpZCI6MSwiaGFzaGNvZGUiOiI0OWJmNGZiNTRiNjBmMTA3YTU1NGU1OTllMTE1ZWFiYyIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJpc19zdXBlcmFkbWluIjp0cnVlLCJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6IiQyYiQxMCRVRUNMUFBYRmswYXY2SC5HVmZsVmFlRDB3NklEWWd0RXoxajRTQnluTkRkTGZ5TkpWcEtOeSIsImZvcmNlX3Jlc2V0X3Bhc3N3b3JkIjpmYWxzZX0sImlzX21hc3RlciI6dHJ1ZSwiaWF0IjoxNzY3OTM3MjE2LCJleHAiOjE3NjgwMjM2MTZ9.6is5KxwWgx1uz1M_EqmSod5UOe1b5AtC7cTMw3GpAls"
    },
    body: JSON.stringify({
      toDate: "01-01-2026",
      fromDate: "01-01-2026",
      location_id: selectedLocation,
      vehicle_no: vehicleNo,
      request_data: "",
      gate_slip: productNo,
      iColumns: 13,
      sColumns: ",,,,,,,,,,,",
      iDisplayStart: 0,
      iDisplayLength: 10,
      sEcho: 1
    })
  })
    .then(res => res.json())
    .then(res => {
      console.log("SAP Response: ", res);
      console.log("Table Data", res.data?.data);
      if (res.success && Array.isArray(res.data?.data)) {
        setSapData(res.data.data);
      } else {
        setSapData([]);
      }
    })
    .catch(err => console.error("SAP API error:", err))
    .finally(() => setLoading(false));
};


  // const savedRecentSearch = (vehicle, product) => {
  //   if (!vehicle && !product) return;

  //   const newEntry = {
  //     vehicleNo: vehicle,
  //     productNo: product,
  //     time: Date.now()
  //   };

  //   let exisitng = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  //   exisitng = exisitng.filter(
  //     item =>
  //       item.vehicleNo !== vehicle || item.productNo !== product
  //   );

  //   const updated = [newEntry, ...exisitng].slice(0,5);
  //   localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  //   setRecentSearches(updated);
  // };

  const saveVehicleRecent = (value) => {
    if (!value) return;

    let exisitng = JSON.parse(localStorage.getItem(VEHICE_KEY)) || [];
    exisitng = exisitng.filter(v => v !== value);

    const updated = [value, ...exisitng].slice(0,5);
    localStorage.setItem(VEHICE_KEY, JSON.stringify(updated));
    setVehicleRecent(updated);
  }

  const saveGatesSlipRecent = (value) => {
    if (!value) return;

    let exisitng = JSON.parse(localStorage.getItem(GATESLIP_KEY)) || [];
    exisitng = exisitng.filter(v => v !== value);

    const updated = [value, ...exisitng].slice(0,5);
    localStorage.setItem(GATESLIP_KEY, JSON.stringify(updated));
    setGatesSlipRecent(updated);
  }

  const handleVehicleSearch = () => {
    onVehicleSearch();
    saveVehicleRecent(vehicleNo);
  };

  const handleProductSearch = () => {
    onProductSearch();
    saveGatesSlipRecent(productNo);
  }

  return (
    <div className="search-bar-row">

      <div className="field-group">
        <label>Select Location</label>
        <div className="input-action vehicle-row">
      
        <select 
          className="location-select"
          value={selectedLocation}
          onChange={e => setSelectedLocation(e.target.value)}
        >
          <option value="">Location</option>
          {locations.map(loc => (
            <option
              key={loc.hashcode}
              value={loc.hashcode}
              >
                {loc.name}
              </option>
          ))}
        </select>

        <button onClick={handleLocationSearch}>
            <FaSearch />
          </button>
          
        </div>
      </div>

      <div className="field-group">
        <label>Vehicle No</label>
        <div className="input-action">
          <input
            type="text"
            placeholder="Enter Vehicle No"
            value={vehicleNo}
            onChange={e => setVehicleNo(e.target.value)}
          />
          <button onClick={handleVehicleSearch}>
            <FaSearch />
          </button>

          <button 
              className="recent-open-btn" 
              onClick={() => {setShowVehicleRecent(v => !v);
                setShowGatesSlipRecent(false);}
              }
              title="Vehicle History"
          >
              <FaHistory />
          </button>
        </div>

        {showVehicleRecent && (
          <div className="recent-panel">
            <div className="recent-header">
              <span>Vehicle History</span>
              <FaTimes onClick={() => setShowVehicleRecent(false)} />
            </div>

            {vehicleRecent.length === 0 ? (
              <div className="recent-empty">No Recent Vehicles</div>
            ): (
              vehicleRecent.map((v, i) => (
                <div
                  key={i}
                  className="recent-item"
                  onClick={() => {
                    setVehicleNo(v);
                    setShowVehicleRecent(false);
                    onVehicleSearch();
                  }}
                  >
                    {v}
                  </div>
              ))
            )}

          </div>
        )}
      </div>

      <div className="field-group">
        <label>Gateslip No</label>
        <div className="input-action">
          <input
            type="text"
            placeholder="Enter Gateslip No"
            value={productNo}
            onChange={e => setProductNo(e.target.value)}
          />
          <button onClick={handleProductSearch}>
            <FaSearch />
          </button>

          <button
            className="recent-open-btn"
            onClick={() => { setShowGatesSlipRecent(v => !v);
              setShowVehicleRecent(false);
            }}
            title="Gateslip History"
            >
              <FaHistory />
            </button>
      </div>

      {showGatesSlipRecent && (
        <div className="recent-panel">
          <div className="recent-header">
            <span>Gateslip History</span>
            <FaTimes onClick={() => setShowGatesSlipRecent(false)} />
          </div>

          {gateslipRecent.length === 0 ? (
            <div className="recent-empty">No recent gateslips</div>
          ) : (
            gateslipRecent.map((g, i) => (
              <div
                key={i}
                className="recent-item"
                onClick={() => {
                  setProductNo(g);
                  setShowGatesSlipRecent(false);
                  onProductSearch();
                }}
              >
                {g}
              </div>
            ))
          )}

        </div>
      )}

      </div>

      
       {/* <div className="recent-floating">
        {!showRecent && (
          <button 
            className="recent-open-btn"
            title="Recent Searches  "
            onClick={() => setShowRecent(true)}
            >
              <FaHistory />
            </button>
        )}

        {showRecent && (
          <div className="recent-panel">
            <div className="recent-header">
              <span>Recent Searches</span>
              <FaTimes 
                className="recent-close"
                onClick={() => setShowRecent(false)}
              />
          </div>

          {recentSearches.length === 0 ? (
            <div className="recent-empty">No recent searches</div>
          ) : (
            recentSearches.map((item, index) => (
              <div
                key={index}
                className="recent-item"
                onClick={() => {
                  setShowRecent(false);

                  if(item.vehicleNo) {
                    setVehicleNo(item.vehicleNo);
                    onVehicleSearch();
                  }

                  if(item.productNo) {
                    setProductNo(item.productNo);
                    onProductSearch();
                  }
                }}
                >
                  {item.vehicleNo && <div>{item.vehicleNo}</div>}
                  {item.productNo && <div>{item.productNo}</div>}
                </div>
            ))
          )}
          </div>
        )}
       </div> */}

       {/* {loading && <p style={{ marginTop: "20px" }}>Loading data...</p>}

{!loading && sapData.length > 0 && (
  <div className="table-wrapper">
    <table className="sap-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Vehicle No</th>
          <th>Gate Slip</th>
          <th>Location</th>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {sapData.map((row, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
           
            <td>{row.gate_slip}</td>
           
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

{!loading && sapData.length === 0 && (
  <p style={{ marginTop: "20px" }}>No data found</p>
)} */}


    </div>
    
  );
};

export default SearchBar;
