import React, { useState } from 'react';
import Header from './components/Header';
import SearchFilter from './components/SearchFilter';
import DataTable from './components/DataTable';
import './App.css';

function App() {
  const [data, setData] = useState([
    { gateSlip: '6204037108', vehicle: 'RJ18GC7704', driver: 'KARAMVEER', plant: 'OB10', entryDate: '2025-03-11' },
    { gateSlip: '6204035955', vehicle: 'UP41BT7155', driver: 'ARJUN PAL', plant: 'OB10', entryDate: '2025-03-11' },
    { gateSlip: '6204037116', vehicle: 'MH19CY4924', driver: 'SHAIKH', plant: 'OB10', entryDate: '2025-03-11' },
    { gateSlip: '6204037397', vehicle: 'UP36T3180', driver: 'NIYAZ ALI', plant: 'N431', entryDate: '2025-03-11' },
    { gateSlip: '6204037163', vehicle: 'MP44HA1137', driver: 'pramod', plant: 'N209', entryDate: '2025-03-11' },
  ]);

  const handleSearch = (filters) => {
    const { vehicle, gate, location } = filters;
    const filteredData = data.filter(item =>
      item.vehicle.includes(vehicle) &&
      item.gateSlip.includes(gate) &&
      item.plant.includes(location)
    );
    setData(filteredData);
  };

  return (
    <div className="App">
      <Header />
      <div className="container">
        <SearchFilter onSearch={handleSearch} />
        <DataTable data={data} />
      </div>
    </div>
  );
}

export default App;
