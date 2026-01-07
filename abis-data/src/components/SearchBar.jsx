import { FaSearch } from "react-icons/fa";

const SearchBar = ({
    vehicleNo,
    setVehicleNo,
    productNo,
    setProductNo,
    onVehicleSearch,
    onProductSearch
}) => {
  return (
    <div className="search-bar-row">

      <div className="field-group">
        <label>Vehicle No</label>
        <div className="input-action">
          <input
            type="text"
            placeholder="Enter Vehicle No"
            value={vehicleNo}
            onChange={e => setVehicleNo(e.target.value)}
          />
          <button onClick={onVehicleSearch}>
            <FaSearch />
          </button>
        </div>
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
          <button onClick={onProductSearch}>
            <FaSearch />
          </button>
        </div>
      </div>

    </div>
  );
};

export default SearchBar;
