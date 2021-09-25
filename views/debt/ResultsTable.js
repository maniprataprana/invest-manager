export default function ResultsTable({ data }) {
  if (data === null) {
    return null;
  }
  console.log(data);
  if (data.length < 2) {
    return <p> No data available or check your csv file</p>;
  }
  const labels = Object.keys(data[0]);
  const rowData = data;
  console.log(labels, rowData);
  //return null;
  return (
    <div className="flex flex-col">
      <h3 className="text-lg font-medium text-gray-900 py-4">
        Valuation Results
      </h3>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {labels.map((label) => (
                    <th
                      scope="col"
                      key={"label" + label}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {label}
                    </th>
                  ))}

                  {/* <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th> */}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rowData.map((row, idx) => (
                  <tr key={idx + "lbl+row"}>
                    {labels.map((lbl, idxx) => (
                      <td
                        key={"cell" + row[lbl] + idxx}
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                      >
                        {row[lbl]}
                      </td>
                    ))}
                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {row.data[1]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {row.data[2]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {row.data[3]}
                    </td> */}
                    {/* <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                          Edit
                        </a>
                      </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
