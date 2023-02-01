import React, { useEffect, useState } from "react";
import "./App.css";
import "./components/Chart.css";
import machine_data from "./data/machine_data.json";
import ItemsContainer from "./components/ItemsContainer";
import Chart from "./components/Chart";
import { DataI } from "./types/types";

function App() {
  const [data, setData] = useState<DataI[]>(machine_data);
  const [selectedCustomer, setSelectedCustomer] = useState<string>("");
  const [selectedAssetType, setSelectedAssetType] = useState<string>("");
  const [searchedSerialNum, setSearchedSerialNum] = useState<string>("");
  const [showValidContract, setShowValidContract] = useState<boolean | null>(
    null
  );
  const [showValidWarranty, setShowValidWarranty] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    setData(applyFilters());
  }, [
    selectedCustomer,
    selectedAssetType,
    searchedSerialNum,
    showValidContract,
    showValidWarranty,
  ]);

  function applyFilters() {
    let filteredData = machine_data;
    // Customer Filter
    if (selectedCustomer) {
      filteredData = filteredData.filter(
        (el) => el.customer === selectedCustomer
      );
    }

    // AssetType Filter
    if (selectedAssetType) {
      filteredData = filteredData.filter(
        (el) => el.asset_type === selectedAssetType
      );
    }

    // Serial Number Filter
    if (searchedSerialNum) {
      filteredData = filteredData.filter(
        (el) => el.serial_number.indexOf(searchedSerialNum) > -1
      );
    }

    // Valid contract Filter
    if (showValidContract !== null) {
      filteredData = filteredData.filter(
        (el) => el.service_contract === showValidContract
      );
    }

    // Valid warranty Filter
    if (showValidWarranty !== null) {
      filteredData = filteredData.filter(
        (el) => el.warranty === showValidWarranty
      );
    }

    return filteredData;
  }

  return (
    <div className="App">
      <section className="chartSection">
        <div className="chart">
          <Chart
            data={countValidity(data)}
            // data={countValidity(machine_data)}
            setShowValidContract={setShowValidContract}
            setShowValidWarranty={setShowValidWarranty}
          />
        </div>
        <button
          className="resetBtn"
          onClick={() => {
            setSearchedSerialNum("");
            setSelectedAssetType("");
            setSelectedCustomer("");
            setShowValidContract(null);
            setShowValidWarranty(null);
          }}
        >
          Reset
        </button>
      </section>

      <section className="serialNumSection">
        <span>serial_number</span> <br />
        <input
          type="text"
          value={searchedSerialNum}
          placeholder="search.."
          onChange={(e) => setSearchedSerialNum(e.target.value)}
        />
      </section>

      <section className="DataSection">
        <table>
          <thead>
            <tr>
              <th>
                <span>Id</span>
              </th>
              <th>
                <span>customer</span>
                <br />
                <select
                  value={selectedCustomer || "All"}
                  onChange={(e) => {
                    setSelectedCustomer(
                      e.target.value === "All" ? "" : e.target.value
                    );
                  }}
                >
                  <option>All</option>
                  {machine_data
                    .map((el) => el.customer)
                    .filter((el, i, arr) => i === arr.indexOf(el))
                    .map((el, i) => (
                      <option key={i}>{el}</option>
                    ))}
                </select>
              </th>
              <th>
                <span>asset_type</span> <br />
                <select
                  value={selectedAssetType || "All"}
                  onChange={(e) => {
                    setSelectedAssetType(
                      e.target.value === "All" ? "" : e.target.value
                    );
                  }}
                >
                  <option>All</option>
                  {machine_data
                    .map((el) => el.asset_type)
                    .filter((el, i, arr) => i === arr.indexOf(el))
                    .map((el, i) => (
                      <option key={i}>{el}</option>
                    ))}
                </select>
              </th>
              <th>
                <span>serial_number</span> <br />
                <input
                  type="text"
                  value={searchedSerialNum}
                  placeholder="search.."
                  onChange={(e) => setSearchedSerialNum(e.target.value)}
                />
              </th>
              <th>
                <span>contract</span> <br />
                <select
                  value={
                    showValidContract === null
                      ? "All"
                      : showValidContract === true
                      ? "O"
                      : "X"
                  }
                  onChange={(e) => {
                    setShowValidContract(
                      e.target.value === "All"
                        ? null
                        : e.target.value === "O"
                        ? true
                        : false
                    );
                  }}
                >
                  <option>All</option>
                  <option>O</option>
                  <option>X</option>
                </select>
              </th>
              <th>
                <span>warranty</span> <br />
                <select
                  value={
                    showValidWarranty === null
                      ? "All"
                      : showValidWarranty === true
                      ? "O"
                      : "X"
                  }
                  onChange={(e) => {
                    setShowValidWarranty(
                      e.target.value === "All"
                        ? null
                        : e.target.value === "O"
                        ? true
                        : false
                    );
                  }}
                >
                  <option>All</option>
                  <option>O</option>
                  <option>X</option>
                </select>
              </th>
            </tr>
          </thead>
          {data.length > 0 && <ItemsContainer data={data} />}
        </table>
        {data.length > 0 || <div>No Data Found</div>}
      </section>
    </div>
  );
}

export function countValidity(initialData: DataI[]) {
  const bothValidCount = initialData.filter(
    (el) => el.service_contract === true && el.warranty === true
  ).length;

  const contractValidCount = initialData.filter(
    (el) => el.service_contract === true && el.warranty === false
  ).length;
  const warrantyValidCount = initialData.filter(
    (el) => el.service_contract === false && el.warranty === true
  ).length;

  const bothInvalidCount =
    initialData.length -
    (bothValidCount + contractValidCount + warrantyValidCount);

  return [
    bothValidCount,
    warrantyValidCount,
    contractValidCount,
    bothInvalidCount,
  ];
}

export default App;
