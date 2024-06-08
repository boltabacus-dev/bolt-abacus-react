import { FC, useEffect, useState } from 'react';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { BiSolidReport } from 'react-icons/bi';
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
  FilterFn,
} from '@tanstack/react-table';

import { SubAdminStudent } from '@interfaces/StudentsFile';
import { SUB_ADMIN_STUDENT_PROGRESS } from '@constants/routes';

export interface ViewAllStudentsSectionProps {
  students: SubAdminStudent[];
}

const columns: ColumnDef<SubAdminStudent>[] = [
  {
    accessorKey: 'firstName',
    header: ({ column }) => {
      return (
        <button
          type="button"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          First Name
        </button>
      );
    },
  },
  {
    accessorKey: 'lastName',
    header: ({ column }) => {
      return (
        <button
          type="button"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Last Name
        </button>
      );
    },
  },
  {
    accessorKey: 'userId',
    header: 'Actions',
    cell: ({ row }) => (
      <button
        type="button"
        className="flex items-center justify-center p-2 font-semibold text-center text-black duration-150 ease-in-out rounded-lg text-md bg-gold/80 hover:bg-gold"
      >
        <Link
          to={`${SUB_ADMIN_STUDENT_PROGRESS}/${row.getValue('userId')}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <BiSolidReport />
        </Link>
      </button>
    ),
  },
];

const ViewAllStudentsSection: FC<ViewAllStudentsSectionProps> = ({
  students,
}) => {
  const [studentDetails, setStudentDetails] = useState<SubAdminStudent[]>([]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 8,
  });

  const customGlobalFilterFn: FilterFn<SubAdminStudent> = (
    row,
    _columnId,
    filterValue
  ) => {
    const firstName = row.getValue('firstName') as string;
    const lastName = row.getValue('lastName') as string;
    return (
      firstName.toLowerCase().includes(filterValue.toLowerCase()) ||
      lastName.toLowerCase().includes(filterValue.toLowerCase())
    );
  };

  const table = useReactTable({
    data: studentDetails,
    columns,
    debugTable: true,
    state: {
      sorting,
      columnFilters,
      pagination,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: customGlobalFilterFn,
  });

  useEffect(() => {
    setStudentDetails(students);
  }, [students]);

  return (
    <div className="flex flex-col gap-10 px-6 py-2 justify-evenly tablet:justify-between tablet:items-center tablet:p-10 desktop:px-36">
      <div className="flex flex-col w-full gap-10">
        <p className="text-xl font-bold text-gold">All Students</p>
        <input
          type="text"
          className="p-2 text-black rounded-lg focus:outline-none placeholder:text-grey"
          placeholder="Search student..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
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

export default ViewAllStudentsSection;
