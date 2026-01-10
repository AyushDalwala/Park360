import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import DataTable from "./components/DataTable";
import { useState } from "react";
import data from "./data/abis_sap_data.json";
import LocationTable from "./components/LocationTable";
import "./App.css";

function App() {

  const [filteredData, setFilteredData] = useState([]);
  const [vehicleNo, setVehicleNo] = useState("");
  const [productNo, setProductNo] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [sapData, setSapData] = useState([]);

  // const saveRecentSearch = (entry) => {
  //   const existing = JSON.parse(localStorage.getItem("recentSearches")) || [];

  //   const updated = [
  //     entry,
  //     ...existing.filter(
  //       e =>
  //         e.vehicleNo !== entry.vehicleNo || e.productNo !== entry.productNo
  //     )
  //   ].slice(0,5);

  //   localStorage.setItem("recentSearches", JSON.stringify(updated));
  // };

  const searchByVehicle = (value = vehicleNo) => {
      setHasSearched(true);
      const result = data.filter(
        item => item.VEHICLE === value
      );
      setFilteredData(result);
      //saveRecentSearch({vehicleNo: value});
  };
  
  const searchByProduct = (value = productNo) => {
      setHasSearched(true);
      const result = data.filter(
        item => String(item.GATESLIP) === String(value).trim()
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
          setSapData={setSapData}
          setHasSearched={setHasSearched}
        />
        <DataTable 
          data={filteredData}
          onClear={clearAll}
          hasSearched={hasSearched}
        />

        <LocationTable
         
        />
      </div>
    </>
  );
}

export default App;