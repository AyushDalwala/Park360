const DataTable = ({ data, onClear, hasSearched }) => {

   if (!hasSearched) return null;

   if(hasSearched && data.length === 0) {
    return (
        <div className="table-container">
            <p>No records found</p>
            <button className="clear-btn" onClick={onClear}>
                Clear
            </button>
        </div>
    );
   }

   const record = data[0];
   const gateItems = record.GATEPASS_ITEM || [];

  return (
    <div className="table-container">

        <h3 style={{marginTop: "20px"}}>Records</h3>
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>

        <tbody>
          {Object.entries(record).map(([key, value]) => {
                
                if(Array.isArray(value)) return null;

                return(
                    <tr key={key}>
                        <td><strong>{key}</strong></td>
                        <td>{String(value)}</td>
                    </tr>
                );
          })}
        </tbody>
      </table>

        {gateItems.length > 0 && (
            <>
                <h3 style={{marginTop: "20px"}}>Gatepass Items</h3>
                
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr>
                                {Object.keys(gateItems[0]).map(col => (
                                    <th key={col}>{col}</th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {gateItems.map((item, index) => (
                                <tr key={index}>
                                    {Object.values(item).map((val, i) => (
                                        <td key={i}>{String(val)}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        )}

      <button className="clear-btn" onClick={onClear}>
        Clear
       </button>
    </div>
  );
};

export default DataTable;
