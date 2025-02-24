type TableData = Record<string, any>;

type TableProps = {
  headers: string[];
  data: TableData[];
  loading: boolean;
};

const Table = ({ headers = [], data = [], loading = false }: TableProps) => {
  if (loading)
    return (
      <div className="flex justify-center items-center">
        <p className="text-lg font-bold italic mt-20">Loading ...</p>
      </div>
    );
  return (
    <div className="flex justify-center  ">
      <table className="mt-6  w-[97%]">
        <thead className="">
          <tr className="text-left bg-as-blue">
            {headers.map((header, index) => (
              <th key={index} className="border border-as-gray p-5 text-black">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="hover:bg-as-gray/80 transition-colors duration-500"
            >
              {headers.map((header, colIndex) => (
                <td
                  key={`${rowIndex}-${colIndex}`}
                  className="border border-as-gray p-2.5"
                >
                  {header.toLowerCase() === "discount"
                    ? row["discountPercentage"]
                    : row[header.toLowerCase()]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
