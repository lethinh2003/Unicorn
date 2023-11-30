import {
  ChevronDownIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";
import { flexRender } from "@tanstack/react-table";

const ListTable = ({ table }) => {
  return (
    <>
      <div className="overflow-x-auto ">
        <div className=" rounded-lg border  border-gray-200 drop-shadow-lg">
          <table className=" min-w-full divide-y divide-gray-200 overflow-hidden rounded-lg dark:divide-gray-700">
            <thead className="bg-[#38AC8F1A]">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        className="px-4 py-[1.6rem] text-left text-[1.5rem] font-bold text-[#2B3445] rtl:text-right"
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? "cursor-pointer select-none flex gap-2 items-center"
                                : "",
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {header.column.getCanSort() &&
                              !header.column.getIsSorted() && (
                                <ChevronUpDownIcon className="h-4 w-4" />
                              )}

                            {{
                              asc: <ChevronUpIcon className="h-4 w-4" />,
                              desc: <ChevronDownIcon className="h-4 w-4" />,
                            }[header.column.getIsSorted()] ?? null}
                          </div>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white ">
              {table.getRowModel().rows.map((row) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          className="whitespace-nowrap px-4 py-[1.6rem] text-[1.5rem] font-medium text-[#2B3445] drop-shadow-sm"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default ListTable;
