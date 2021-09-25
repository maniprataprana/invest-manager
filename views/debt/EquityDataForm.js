/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

import { useState, useCallback, useEffect } from "react";
import { API_URL, API_ROUTES } from "../../config";
import fetcher from "@/utils/fetcher";
import ResultsTable from "./ResultsTable";
import ComputationResults from "./ComputationResults";
import EquityInputType from "./EquityInputType";
import toast from "@/components/toast";

import { format } from "date-fns";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import DayPickerInput from "react-day-picker/DayPickerInput";
// import "react-day-picker/lib/style.css";

export default function EquityDataForm() {
 // const [computeType, setComputeType] = useState(null);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  const [startdate, setStartDate] = useState(new Date());
  const [maturitydate, setMaturityDate] = useState(new Date());
  const [coupon, setCoupon] = useState(0);
  const [price, setPrice] = useState(0);
  const [notional, setNotional] = useState(0);
  const [frequency, setFrequency] = useState(0);
  const [bondMaturity, setBondMaturity] = useState(0);
  const [zeroMaturity, setZeroMaturity] = useState("")
  const [zeroRates, setZeroRates] = useState("")
  
  const [tableData, setTableData] = useState(null);
  //const [lastType, setLastType] = useState(null);
  //console.log("date", format(date, "yyyy-MM-dd"));
  const notify = useCallback((type, message) => {
    toast({ type, message });
  }, []);

  const getComputationResults = async (e) => {
    e.preventDefault();
    //console.log(tableData);
    setIsSaveDisabled(true);
    setTableData(null);
    //TODO: move logic to config

    const uuid = window.localStorage.getItem("uuid");
    console.log(uuid);
    const API_ROUTE = {
        route: `${API_URL}${API_ROUTES.bond_riskvaluation}`,
        body: {
          startdate: format(startdate, "yyyy-MM-dd"),
          maturitydate: format(maturitydate, "yyyy-MM-dd"),
          frequency,
          coupon,
          price,
          notional,
          zero_maturities:zeroMaturity.split(","),
          zero_rates: zeroRates.split(","),
          bond_maturity:bondMaturity,
          //uuid,
        },
      };

    console.log("API_ROUTE", API_ROUTE);
    //return
    try {
      const response = await fetcher(API_ROUTE.route, {
        body: API_ROUTE.body,
      });
    console.log("response", response);
      //   if (selectedDataType.type === "equity") {
      //     window.localStorage.setItem("uuid", response.key);
      //   }
      //setLastType(computeType?.type);

      setTableData(response);
    } catch (error) {
      //setErrorMessage("Error uploading file to server!");
      notify("error", "Error fetching data!");
      console.log(error);
      //setLastType(null);
      setTableData(null);
    }
    setIsSaveDisabled(false);
  };

  // if (!computeType?.type) return null;
  //console.log(computeType?.type);
  return (
    <>
      {/* <EquityInputType selected={computeType} setSelected={setComputeType} /> */}
      <div className="space-y-6">
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-sm font-medium text-gray-900">
                Parameter Selection
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Select paramters to generate portfolio report.
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form action="#" method="POST">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3 z-10">
                    <label
                      htmlFor="debt-start-date"
                      className="block text-sm font-medium text-gray-700 mb-3"
                    >
                      Start Date
                    </label>
                    <ReactDatePicker
                      selected={startdate}
                      dateFormat="yyyy-MM-dd"
                      onChange={(n_date) => setStartDate(n_date)}
                      isClearable
                      placeholderText="Select start date"
                    />
                  
                  </div>

                  <div className="col-span-6 sm:col-span-3 z-10">
                   
                     <label
                      htmlFor="debt-maturity-date"
                      className="block text-sm font-medium text-gray-700 mb-3"
                    >
                      Maturity Date
                    </label>
                    <ReactDatePicker
                      selected={maturitydate}
                      dateFormat="yyyy-MM-dd"
                      onChange={(n_date) => setMaturityDate(n_date)}
                      isClearable
                      placeholderText="Select maturity date"
                    />
                    {/* <DayPickerInput onDayChange={(day) => console.log(day)} /> */}
                    {/* <input
                    type="text"
                    name="equity-date"
                    id="equity-date"
                    value={date}
                    onChange={(e) => setStartDate(e.target.value)}
                    autoComplete="given-name"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  /> */}
                  </div>
                 
                  <div className="col-span-6 sm:col-span-4">
                    <label
                      htmlFor="debt-frequency"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Frequency
                    </label>
                    <input
                      type="number"
                      name="debt-frequency"
                      id="debt-frequency"
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="debt-coupon"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Coupon
                      </label>
                      <input
                        type="number"
                        value={coupon}
                        name="debt-coupon"
                        id="debt-coupon"
                        onChange={(e) => setCoupon(e.target.value)}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="debt-price"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Price
                      </label>
                      <input
                        type="number"
                        value={price}
                        name="debt-price"
                        id="debt-price"
                        onChange={(e) => setPrice(e.target.value)}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                      <div className="col-span-6 sm:col-span-4">
                        <label
                          htmlFor="debt-notional"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Notional
                        </label>
                        <input
                          type="number"
                          value={notional}
                          name="debt-notional"
                          id="debt-notional"
                          onChange={(e) => setNotional(e.target.value)}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>


                      <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="debt-bondMaturity"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Bond Maturity
                      </label>
                      <input
                        type="number"
                        value={bondMaturity}
                        name="debt-bondMaturity"
                        id="debt-bondMaturity"
                        onChange={(e) => setBondMaturity(e.target.value)}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                   
                    <div className="col-span-6 sm:col-span-4">
                        <label
                          htmlFor="zero-maturity"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Zero Maturities
                        </label>
                        <input
                          type="text"
                          value={zeroMaturity}
                          name="zero-maturity"
                          id="zero-maturity"
                          onChange={(e) => setZeroMaturity(e.target.value)}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-4">
                        <label
                          htmlFor="debt-notional"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Zero Rates
                        </label>
                        <input
                          type="text"
                          value={zeroRates}
                          name="zero-rates"
                          id="zero-rates"
                          onChange={(e) => setZeroRates(e.target.value)}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          {/* <button
          type="button"
          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button> */}
          <button
            onClick={getComputationResults}
            type="submit"
            //disabled={isSaveDisabled}
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Get Results
          </button>
        </div>
        
         {/* {tableData && lastType === "valuation" && (
          <ResultsTable data={tableData} />
        )} */}
        {tableData && (
          <ComputationResults data={tableData} />
        )}
      </div>
    </>
  );
}
