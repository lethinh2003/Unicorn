import TablePaginationActions from "@/components/generals/TablePaginationActions";
import useGetListUsers from "@/customHooks/admin/useGetListUsers";
import { convertDate } from "@/utils/convertDate";
import { convertUserGender } from "@/utils/convertGender";
import { convertUserRole } from "@/utils/convertRole";
import { convertUserStatus } from "@/utils/convertStatus";
import { EyeIcon, PencilIcon } from "@heroicons/react/24/solid";
import { TablePagination } from "@mui/material";
import { compareItems, rankItem } from "@tanstack/match-sorter-utils";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import RemoveUserButton from "./RemoveUserButton";
import SearchBar from "./SearchBar";
import UserListTable from "./UserListTable";

const fuzzyFilter = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

const fuzzySort = (rowA, rowB, columnId) => {
  let dir = 0;

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank,
      rowB.columnFiltersMeta[columnId]?.itemRank
    );
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

const UserList = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const columns = useMemo(
    () => [
      {
        header: "Tên",
        footer: (props) => props.column.id,

        cell: (cell) => cell.getValue(),
        accessorKey: "name",
      },
      {
        header: "Email",
        footer: (props) => props.column.id,
        accessorKey: "email",
      },
      {
        header: "Giới tính",
        footer: (props) => props.column.id,
        accessorFn: (row) => `${convertUserGender(row.gender)}`,
      },
      {
        header: "Phone",
        footer: (props) => props.column.id,
        accessorKey: "phone_number",
      },
      {
        header: "Birthday",
        footer: (props) => props.column.id,
        accessorFn: (row) => `${convertDate(row.birthday)}`,
      },
      {
        header: "Role",
        footer: (props) => props.column.id,
        accessorFn: (row) => `${convertUserRole(row.role)}`,
      },
      {
        header: "Status",
        footer: (props) => props.column.id,
        accessorFn: (row) => `${convertUserStatus(row.status)}`,
      },
      {
        header: "Hành động",

        cell: ({ row: { original } }) => (
          <div className="flex items-center gap-4">
            <EyeIcon className="h-[2rem] w-[2rem] cursor-pointer" />
            <PencilIcon className="h-[2rem] w-[2rem] cursor-pointer" />
            <RemoveUserButton user={original} />
          </div>
        ),
      },
    ],
    []
  );

  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const defaultData = useMemo(() => [], []);

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );
  const { data, isLoading, isError, error, isFetching, refetch } =
    useGetListUsers({
      pageIndex,
      pageSize,
    });

  const table = useReactTable({
    data: data?.data ?? defaultData,
    columns,
    pageCount: data?.metadata?.pageCount ?? -1,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      pagination,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  return (
    <>
      <SearchBar
        value={globalFilter ?? ""}
        onChange={(e) => setGlobalFilter(String(e.target.value))}
      />

      <UserListTable table={table} />
      <TablePagination
        rowsPerPageOptions={[
          5,
          10,
          25,
          { label: "All", value: data?.metadata?.allResults ?? 0 },
        ]}
        component="div"
        count={data?.metadata?.allResults ?? 0}
        rowsPerPage={table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        SelectProps={{
          inputProps: { "aria-label": "rows per page" },
          native: true,
        }}
        onPageChange={(_, page) => {
          table.setPageIndex(page);
        }}
        onRowsPerPageChange={(e) => {
          const size = e.target.value ? Number(e.target.value) : 10;
          table.setPageSize(size);
        }}
        ActionsComponent={TablePaginationActions}
      />
    </>
  );
};
export default UserList;
