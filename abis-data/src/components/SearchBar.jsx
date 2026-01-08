import { FaHistory, FaSearch, FaTimes } from "react-icons/fa";
import { useEffect, useState} from "react";

const STORAGE_KEY = "abis_recent_searches";

const SearchBar = ({
    vehicleNo,
    setVehicleNo,
    productNo,
    setProductNo,
    onVehicleSearch,
    onProductSearch
}) => {

  const [recentSearches, setRecentSearches] = useState([]);
  const [showRecent, setShowRecent] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    setRecentSearches(data);
  }, []);

  const savedRecentSearch = (vehicle, product) => {
    if (!vehicle && !product) return;

    const newEntry = {
      vehicleNo: vehicle,
      productNo: product,
      time: Date.now()
    };

    let exisitng = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    exisitng = exisitng.filter(
      item =>
        item.vehicleNo !== vehicle || item.productNo !== product
    );

    const updated = [newEntry, ...exisitng].slice(0,5);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setRecentSearches(updated);
  };

  const handleVehicleSearch = () => {
    onVehicleSearch();
    savedRecentSearch(vehicleNo, "");
  };

  const handleProductSearch = () => {
    onProductSearch();
    savedRecentSearch("", productNo);
  }

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
          <button onClick={handleVehicleSearch}>
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
          <button onClick={handleProductSearch}>
            <FaSearch />
          </button>
      </div>
      </div>

      
       <div className="recent-floating">
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
       </div>

    </div>
  );
};

export default SearchBar;
