import Pagination from "./Pagination";

type TableData = Record<string, any>;

type TableProps = {
  headers: string[];
  data: TableData[];
  loading: boolean;
  totalProducts: number;
  activePage: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  fields: string[];
};

const Table = ({
  headers = [],
  data = [],
  loading = false,
  totalProducts,
  activePage,
  setActivePage,
  pageSize,
  fields,
}: TableProps) => {
  const numberOfPages = Math.floor(totalProducts / pageSize);

  if (data.length <= 0 && !loading)
    return (
      <div className="flex justify-center items-center">
        <p className="text-lg font-bold italic mt-20"> No Results Found</p>
      </div>
    );

  if (loading)
    return (
      <div className="flex justify-center items-center">
        <p className="text-lg font-bold italic mt-20">Loading ...</p>
      </div>
    );
  return (
    <div className="flex items-center flex-col  ">
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
              {fields.map((field, colIndex) => (
                <td
                  key={`${rowIndex}-${colIndex}`}
                  className="border border-as-gray p-2.5"
                >
                  {row[field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        activePage={activePage}
        numberOfPages={numberOfPages}
        setActivePage={setActivePage}
      />
    </div>
  );
};

export default Table;
