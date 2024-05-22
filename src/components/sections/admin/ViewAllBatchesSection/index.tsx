import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiSolidEdit } from 'react-icons/bi';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  ColumnFiltersState,
  getPaginationRowModel,
} from '@tanstack/react-table';

import { Batch } from '@interfaces/apis/batch';
import { ADMIN_EDIT_BATCH } from '@constants/routes';

export interface ViewAllBatchesSectionProps {
  batches: Batch[];
}

const columns: ColumnDef<Batch>[] = [
  {
    accessorKey: 'batchName',
    header: ({ column }) => {
      return (
        <button
          type="button"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
        </button>
      );
    },
  },
  {
    accessorKey: 'timeDay',
    header: ({ column }) => {
      return (
        <button
          type="button"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Day
        </button>
      );
    },
  },
  {
    accessorKey: 'timeSchedule',
    header: ({ column }) => {
      return (
        <button
          type="button"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Time
        </button>
      );
    },
  },
  {
    accessorKey: 'latestLevelId',
    header: ({ column }) => {
      return (
        <button
          type="button"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Level
        </button>
      );
    },
  },
  {
    accessorKey: 'latestClassId',
    header: ({ column }) => {
      return (
        <button
          type="button"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Class
        </button>
      );
    },
  },
  {
    accessorKey: 'batchId',
    header: 'Actions',
    cell: ({ row }) => (
      <button
        type="button"
        className="flex items-center justify-center p-2 font-semibold text-center text-black duration-150 ease-in-out rounded-lg text-md bg-gold/80 hover:bg-gold"
      >
        <Link
          to={`${ADMIN_EDIT_BATCH}/${row.getValue('batchId')}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <BiSolidEdit />
        </Link>
      </button>
    ),
  },
];

const ViewAllBatchesSection: FC<ViewAllBatchesSectionProps> = ({ batches }) => {
  const [batchDetails, setBatchDetails] = useState<Batch[]>([]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 8,
  });

  const table = useReactTable({
    data: batchDetails,
    columns,
    debugTable: true,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    setBatchDetails(batches);
  }, [batches]);

  return (
    <div className="flex flex-col gap-10 px-6 py-2 justify-evenly tablet:justify-between tablet:items-center tablet:p-10 desktop:px-36">
      <div className="flex flex-col w-full gap-10">
        <p className="text-xl font-bold text-gold">All Batches</p>
        <input
          type="text"
          className="p-2 text-black rounded-lg focus:outline-none placeholder:text-grey"
          placeholder="Search batch..."
          value={
            (table.getColumn('batchName')?.getFilterValue() as string) ?? ''
          }
          onChange={(e) =>
            table.getColumn('batchName')?.setFilterValue(e.target.value)
          }
        />
        <div className="text-sm border bg-darkBlack border-gold rounded-xl">
          <table className="w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b border-gold">
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      <div className="p-1 text-center text-gold/80 tablet:p-3 tablet:text-lg">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      <div className="flex items-center justify-center p-1 text-center tablet:p-2">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-center gap-5 p-2">
            <button
              type="button"
              className="flex items-center justify-center p-2 font-semibold text-center text-black duration-150 ease-in-out rounded-lg text-md bg-gold/80 hover:bg-gold disabled:bg-gold/30"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <MdNavigateBefore />
            </button>
            <p>{table.getState().pagination.pageIndex + 1}</p>
            <button
              type="button"
              className="flex items-center justify-center p-2 font-semibold text-center text-black duration-150 ease-in-out rounded-lg text-md bg-gold/80 hover:bg-gold disabled:bg-gold/30"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <MdNavigateNext />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllBatchesSection;
