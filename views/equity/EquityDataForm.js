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
  const [computeType, setComputeType] = useState(null);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  const [date, setStartDate] = useState(new Date());
  const [confidencelevel, setConfidencelevel] = useState(0);
  const [riskfreerate, setRiskFreeRate] = useState(0);
  const [days, setDays] = useState(0);
  const [tableData, setTableData] = useState(null);
  const [lastType, setLastType] = useState(null);
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
    const API_ROUTE =
      computeType?.type === "valuation"
        ? {
            route: `${API_URL}${API_ROUTES.equity_valuation}`,
            body: {
              date: format(date, "yyyy-MM-dd"),
              uuid,
            },
          }
        : {
            route: `${API_URL}${API_ROUTES.equity_risk_computation}`,
            body: {
              date: format(date, "yyyy-MM-dd"),
              uuid,
              days,
              confidencelevel,
              riskfreerate,
              vartype: "covar",
            },
          };

    console.log("API_ROUTE", API_ROUTE);
    try {
      const response = await fetcher(API_ROUTE.route, {
        body: API_ROUTE.body,
      });
      console.log("response", response, computeType?.type);
      //   if (selectedDataType.type === "equity") {
      //     window.localStorage.setItem("uuid", response.key);
      //   }
      setLastType(computeType?.type);
      setTableData(response);
    } catch (error) {
      //setErrorMessage("Error uploading file to server!");
      notify("error", "Error fetching data!");
      console.log(error);
      setLastType(null);
      setTableData(null);
    }
    setIsSaveDisabled(false);
  };

  // if (!computeType?.type) return null;
  console.log(computeType?.type);
  return (
    <>
      <EquityInputType selected={computeType} setSelected={setComputeType} />
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
                      htmlFor="equity-date"
                      className="block text-sm font-medium text-gray-700 mb-3"
                    >
                      Date
                    </label>
                    <ReactDatePicker
                      selected={date}
                      dateFormat="yyyy-MM-dd"
                      onChange={(n_date) => setStartDate(n_date)}
                      isClearable
                      placeholderText="Select a date"
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

                  {computeType?.type === "risk" && (
                    <>
                      <div className="col-span-6 sm:col-span-4">
                        <label
                          htmlFor="equity-days"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Days
                        </label>
                        <input
                          type="number"
                          name="equity-days"
                          id="equity-days"
                          value={days}
                          onChange={(e) => setDays(e.target.value)}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-4">
                        <label
                          htmlFor="equity-confidence"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Confidence
                        </label>
                        <input
                          type="number"
                          value={confidencelevel}
                          name="equity-confidence"
                          id="equity-confidence"
                          onChange={(e) => setConfidencelevel(e.target.value)}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-4">
                        <label
                          htmlFor="risk-free-rate"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Risk Free Rate
                        </label>
                        <input
                          type="number"
                          value={riskfreerate}
                          name="risk-free-rate"
                          id="risk-free-rate"
                          onChange={(e) => setRiskFreeRate(e.target.value)}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </>
                  )}
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
        {tableData && lastType === "valuation" && (
          <ResultsTable data={tableData} />
        )}
        {tableData && lastType === "risk" && (
          <ComputationResults data={tableData} />
        )}
      </div>
    </>
  );
}
