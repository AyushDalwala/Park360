import React, { useState, useEffect } from 'react';
import { FaSearch, FaRedo } from 'react-icons/fa';

const SearchFilter = ({ onSearch }) => {
  const [vehicle, setVehicle] = useState('');
  const [gate, setGate] = useState('');
  
  
  const [location, setLocation] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");


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
        setLocation(res.data);
      }
    })
    .catch(err => console.error("Location API error: ", err));
  }, []);

  const handleSearch = () => {
    onSearch({ vehicle, gate, location: selectedLocation });
  };

  const handleClear = () => {
    setVehicle('');
    setGate('');
    setSelectedLocation('');
    onSearch({ vehicle: '', gate: '', location: '' });
  };

  return (
    <div className="search-filter shadow-sm p-3 mb-4 bg-white rounded">
      <div className="row g-3">
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Vehicle No"
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Gateslip No"
            value={gate}
            onChange={(e) => setGate(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            placeholder="Select Location"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">Location</option>
            {location.map(loc => (
                <option
                    key={loc.hashcode}
                    value={loc.hashcode}
                >
                    {loc.name}
                </option>
            ))}
          </select>
        </div>
        <div className="col-md-3 d-flex gap-2">
          <button className="btn btn-primary flex-grow-1" onClick={handleSearch}>
            <FaSearch /> Search
          </button>
          <button className="btn btn-secondary flex-grow-1" onClick={handleClear}>
            <FaRedo /> Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
