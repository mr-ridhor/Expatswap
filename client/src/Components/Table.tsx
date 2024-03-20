import { useState } from "react";

export interface ColumnType<T> {
  label: string;
  sortable?: boolean;
  cell?: (row: T) => React.ReactNode;
  selector?: keyof T;
}

interface TableProps<DataItem> {
  data: DataItem[];
  columns: ColumnType<DataItem>[];
}
const Table = <DataItem,>({ data, columns }: TableProps<DataItem>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortColumn, setSortColumn] = useState<keyof DataItem | null>(null); // Specify the type explicitly
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Sort the data based on the selected column and direction
  // const sortedData = data.slice().sort((a, b) => {
  //   if (sortColumn !== null) {
  //     // Check for null explicitly
  //     const aValue = a[sortColumn] as any;
  //     const bValue = b[sortColumn] as any;
  //     if (sortDirection === "asc") {
  //       return aValue.localeCompare(bValue);
  //     } else {
  //       return bValue.localeCompare(aValue);
  //     }
  //   }
  //   return 0;
  // });
  const sortedData = data.slice().sort((a, b) => {
    if (sortColumn !== null) {
      const aValue = sortColumn === 'id' ? a[sortColumn] : (a[sortColumn] as any).toString();
      const bValue = sortColumn === 'id' ? b[sortColumn] : (b[sortColumn] as any).toString();
  
      if (sortDirection === "asc") {
        return sortColumn === 'id' ? aValue - bValue : aValue.localeCompare(bValue);
      } else {
        return sortColumn === 'id' ? bValue - aValue : bValue.localeCompare(aValue);
      }
    }
    return 0;
  });
  

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  // Handle header click for sorting
  const handleHeaderClick = (key: keyof DataItem) => {
    if (sortColumn === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(key);
      setSortDirection("asc");
    }
  };

  // Calculate total pages
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Change page
  const paginate = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const visiblePageNumbers = [];
  if (totalPages <= 5) {
    visiblePageNumbers.push(...pageNumbers);
  } else {
    visiblePageNumbers.push(1);
    if (
      currentPage > 2 &&
      currentPage !== totalPages - 1 &&
      currentPage !== totalPages
    ) {
      visiblePageNumbers.push(currentPage);
    } else {
      visiblePageNumbers.push(2);
    }
    visiblePageNumbers.push("...", totalPages - 1, totalPages);
  }
  return (
    <div className="w-full p-4">
      <div className="w-full overflow-x-auto no-scrollbar">
        <table className="min-w-full divide-y divide-gray-200  ">
          <thead>
            <tr className="bg-gray-100/30 dark:bg-slate-950 rounded-md">
              {columns.map((column, id) => (
                <th
                  key={id}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text--500 uppercase tracking-wider cursor-pointer"
                  onClick={() => {
                    if (column.sortable) {
                      if (column.sortable && column.selector) {
                        handleHeaderClick(column.selector);
                      }
                    }
                  }}
                >
                  {column.label}
                  {column.sortable && sortColumn === column.selector && (
                    <span
                      className={`ml-2 text-black ${
                        sortDirection === "asc"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {sortDirection === "asc" ? "▲" : "▼"}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-900 divide-y divide-gray-200 overflow-y-auto">
            {currentItems.map((item, index) => (
              <tr key={index}>
                {columns.map((column, columnIndex) => (
                  <td key={columnIndex} className="px-6 py-4 whitespace-nowrap">
                    {column.cell
                      ? (column.cell(item) as React.ReactNode)
                      : (item[
                          column.selector as keyof typeof item
                        ] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center  items-center">
        <nav className="flex items-center justify-between">
          <div className="flex-1 flex justify-between space-x-4">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`${
                currentPage === 1 ? "cursor-not-allowed" : " cursor-pointer"
              } px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 dark:border-slate-700 rounded-md hover:bg-gray-50`}
            >
              Previous
            </button>
            <div className="flex space-x-2">
              {visiblePageNumbers.map((pageNumber, id) => (
                <button
                  key={id}
                  onClick={() => {
                    if (typeof pageNumber === "number") {
                      paginate(pageNumber);
                    }
                  }}
                  className={`px-4 py-2 text-sm font-medium ${
                    pageNumber === currentPage
                      ? "bg-slate-800 dark:bg-gray-500 text-white"
                      : "text-gray-500 hover:bg-gray-50"
                  } rounded-md`}
                >
                  {pageNumber}
                </button>
              ))}
            </div>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastItem >= sortedData.length}
              className={`${
                indexOfLastItem >= sortedData.length
                  ? "cursor-not-allowed"
                  : " cursor-pointer"
              } px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50`}
            >
              Next
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Table;
