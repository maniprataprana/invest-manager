import { useState, useCallback } from "react";
import { CSVReader } from "react-papaparse";
import FileUpload from "./FileUpload";
import CSVTable from "./CSVTable";
import fetcher from "@/utils/fetcher";
import { API_URL, API_ROUTES } from "config";
import DataSelection from "./DataSelection";
import toast from "@/components/toast";

export default function Upload() {
  const [tableData, setTableData] = useState(null);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [showTable, setShowTable] = useState(false);
  const [selectedDataType, setSelectedDataType] = useState({
    name: "Portfolio data",
    type: "equity",
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const notify = useCallback((type, message) => {
    toast({ type, message });
  }, []);

  // const dismiss = useCallback(() => {
  //   toast.dismiss();
  // }, []);

  const handleOnDrop = (data) => {
    console.log("---------------------------");
    console.log(data);
    console.log("---------------------------");
    setTableData(data);
    setIsSaveDisabled(false);
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
    setIsSaveDisabled(true);
    setErrorMessage("Error uploading file!");
    notify("error", "Error uploading file to browser!");
  };

  const handleOnRemoveFile = (data) => {
    console.log("---------------------------");
    console.log(data);
    console.log("---------------------------");
    setTableData(null);
    setIsSaveDisabled(true);
  };

  const onSaveClick = async (e) => {
    e.preventDefault();
    //console.log(tableData);
    setIsSaveDisabled(true);
    //TODO: move logic to config
    const API_ROUTE =
      selectedDataType.type === "equity"
        ? {
            route: `${API_URL}${API_ROUTES.equity_uploader}`,
            key: "equityportfolioupload",
          }
        : {
            route: `${API_URL}${API_ROUTES.equity_market_data_uploader}`,
            key: "equitymarketdata",
          };

    console.log("API_ROUTE", API_ROUTE);
    try {
      const response = await fetcher(API_ROUTE.route, {
        body: { [API_ROUTE.key]: tableData },
      });
      console.log("response", response);
      if (selectedDataType.type === "equity") {
        window.localStorage.setItem("uuid", response.key);
      }
      notify("success", "File succesfully uploaded!");
    } catch (error) {
      setErrorMessage("Error uploading file to server!");
      //console.log(error);
      notify("error", "Error uploading file to server!");
    }
    setIsSaveDisabled(false);
  };

  const onShowTableClick = (e) => {
    e.preventDefault();
    setShowTable(!showTable);
  };
  return (
    <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
      <form action="#" method="POST">
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                File Upload
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Upload your portfolio information here (csv file).
              </p>
            </div>

            <FileUpload>
              <CSVReader
                onDrop={handleOnDrop}
                onError={handleOnError}
                noDrag
                addRemoveButton
                onRemoveFile={handleOnRemoveFile}
              >
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload a file</span>
                      {/* <input id="file-upload" name="file-upload" type="file" className="sr-only" /> */}
                      {/* {children} */}
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">CSV file up to 10MB</p>
                </div>
              </CSVReader>
            </FileUpload>
          </div>

          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <DataSelection
              selected={selectedDataType}
              setSelected={setSelectedDataType}
            />
            {/* {!isSaveDisabled && (
              <button
                type="submit"
                className="disabled:opacity-50 bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mx-8"
                onClick={onShowTableClick}
              >
                {showTable ? "Hide Data" : "View Data"}
              </button>
            )} */}
            <button
              type="submit"
              className="disabled:opacity-50 bg-indigo-600 my-4 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isSaveDisabled}
              onClick={onSaveClick}
            >
              Save
            </button>
          </div>
        </div>
      </form>
      {/* <CSVTable data={tableData} /> */}
      {/* {showTable && <CSVTable data={tableData} />} */}
    </div>
  );
}
