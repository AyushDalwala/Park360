import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import DataTable from "./components/DataTable";
import { useState } from "react";
import data from "./data/abis_sap_data.json";
import "./App.css";

function App() {

  const [filteredData, setFilteredData] = useState([]);
  const [vehicleNo, setVehicleNo] = useState("");
  const [productNo, setProductNo] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const searchByVehicle = () => {
      setHasSearched(true);
      const result = data.filter(
        item => item.VEHICLE === vehicleNo
      );
      setFilteredData(result);
  };
  
  const searchByProduct = () => {
      setHasSearched(true);
      const result = data.filter(
        item => String(item.GATESLIP) === productNo.trim()
      );
      setFilteredData(result);
  };

  const clearAll = () => {
    setVehicleNo("");
    setProductNo("");
    setFilteredData([]);
    setHasSearched(false);
  }

  return (
   <>
      <Header />
      <div className="main-container">
        <SearchBar 
          vehicleNo={vehicleNo}
          setVehicleNo={setVehicleNo}
          productNo={productNo}
          setProductNo={setProductNo}
          onVehicleSearch={searchByVehicle}
          onProductSearch={searchByProduct}
        />
        <DataTable 
          data={filteredData}
          onClear={clearAll}
          hasSearched={hasSearched}
        />
      </div>
    </>
  );
}

export default App;