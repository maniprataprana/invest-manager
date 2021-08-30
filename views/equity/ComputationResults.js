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
  const { riskresult, varresult } = data;
  console.log(riskresult, varresult);

  //const [labels, ...rows] = varresult;

  return (
    <div className="flex flex-col">
      <MatrixTable
        heading="VaR Computation"
        data={varresult}
        key="VaR+Computation"
      />
      <MatrixTable
        heading="Risk Senstivities"
        data={riskresult}
        key="Risk+Senstivities"
      />
    </div>
  );

  return (
    <div className="flex flex-col">
      <h3 className="text-lg font-medium text-gray-900 py-4">
        Risk Senstivities / VaR Computation
      </h3>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {labels.data.map((label) => (
                    <th
                      key={"header" + label}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rows.map((row, idx) => (
                  <tr key={"result-row" + idx}>
                    {row.data.map((cell) => (
                      <td
                        key={"cell" + cell}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {cell}
                      </td>
                    ))}
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

const MatrixTable = ({ heading, data }) => {
  if (!data || data.length === 0) return null;
  const [labels, ...rows] = data;
  return (
    <>
      <h3 className="text-lg font-medium text-gray-900 py-4">{heading}</h3>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {labels.data.map((label) => (
                    <th
                      key={"header" + label}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rows.map((row, idx) => (
                  <tr key={"result-row" + idx}>
                    {row.data.map((cell) => (
                      <td
                        key={"cell" + cell}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {cell}
                      </td>
                    ))}
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
