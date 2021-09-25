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
  console.log()
  //const results = Object.keys(data);
  //const { riskresult, varresult } = data;
  //console.log(riskresult, varresult);

  //const [labels, ...rows] = varresult;
  // const debtData = [Object.keys(data)]
  return (
    <div className="flex flex-col">
      <MatrixTable
        heading="VaR Computation"
        data={data}
        key="VaR+Computation"
      />
      {/* <MatrixTable
        heading="Risk Senstivities"
        data={riskresult}
        key="Risk+Senstivities"
      /> */}
    </div>
  );
}

const MatrixTable = ({ data }) => {
  if (!data || data.length === 0) return null;
  //const [labels, ...rows] = data;
  return (
    <>
      <h3 className="text-lg font-medium text-gray-900 py-4">Debt Computations Results</h3>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                   <th
                      key={"headerName"}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      key={"headerValue" }
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Value
                    </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.keys(data).map((cell_key) => (
                  <tr key={"result-row" + cell_key}>
                    
                      <td
                        key={"cell1" + cell_key}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {cell_key}
                      </td>
                      <td
                        key={"cell2" + cell_key}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {data[cell_key]}
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
