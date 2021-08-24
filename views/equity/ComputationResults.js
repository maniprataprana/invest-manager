/* This example requires Tailwind CSS v2.0+ */
const people = [
  {
    name: "Jane Cooper",
    title: "Regional Paradigm Technician",
    role: "Admin",
    email: "jane.cooper@example.com",
  },
  // More people...
];

export default function ComputationResults({ data }) {
  if (!data) return null;
  //const results = Object.keys(data);

  const {
    VaR_holding_value_histsim,
    VaR_holding_value_varcovar,
    VaR_return_histsim,
    VaR_return_varcovar,
  } = data;
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {"  "}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Return %
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Holding Value
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr key={"result" + "row1"}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Variance Covariance Approach
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {VaR_return_varcovar}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {VaR_return_histsim}
                  </td>
                </tr>
                <tr key={"result" + "row2"}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Historical Simulation Approach
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {VaR_holding_value_varcovar}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {VaR_holding_value_histsim}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
