import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GrScorecard } from 'react-icons/gr';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { Tooltip } from 'react-tooltip';

import { StudentReport } from '@interfaces/apis/teacher';
import { getScoreInteger } from '@helpers/batch';
import { getClassNamesForScore } from '@helpers/report';

import { TEACHER_STUDENT_PROGRESS } from '@constants/routes';

export interface BatchReportTableProps {
  studentReports: StudentReport[];
}

const columns: ColumnDef<StudentReport>[] = [
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
    cell: ({ row }) => (
      <p className="text-center capitalize">{row.getValue('firstName')}</p>
    ),
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
    cell: ({ row }) => (
      <p className="text-center capitalize">{row.getValue('lastName')}</p>
    ),
  },
  {
    accessorKey: 'classwork',
    header: ({ column }) => {
      return (
        <button
          type="button"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Classwork
        </button>
      );
    },
    cell: ({ row }) => (
      // TODO: Add time after API changes
      <span
        className={`p-2 px-4 text-center border rounded text-xs w-fit min-w-[60px] tablet:text-md tablet:min-w-[100px]
          ${getClassNamesForScore(10, row.getValue('classwork'))}
      `}
      >
        {getScoreInteger(row.getValue('classwork'))}%
      </span>
    ),
  },
  {
    accessorKey: 'homework',
    header: ({ column }) => {
      return (
        <button
          type="button"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Homework
        </button>
      );
    },
    cell: ({ row }) => (
      // TODO: Add time after API changes
      <span
        className={`p-2 px-4 text-center border rounded text-xs w-fit min-w-[60px] tablet:text-md tablet:min-w-[100px]
          ${getClassNamesForScore(10, row.getValue('homework'))}
      `}
      >
        {getScoreInteger(row.getValue('homework'))}%
      </span>
    ),
  },
  {
    accessorKey: 'userId',
    header: 'Actions',
    cell: ({ row }) => (
      <>
        <button
          type="button"
          className="flex items-center justify-center p-2 font-semibold text-center text-black duration-150 ease-in-out rounded-lg text-md bg-gold/80 hover:bg-gold"
          data-tooltip-id="view-progress-tooltip"
          data-tooltip-content="View Progress"
          data-tooltip-place="right"
        >
          <Link
            to={`${TEACHER_STUDENT_PROGRESS}/${row.getValue('userId')}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GrScorecard />
          </Link>
        </button>
        <Tooltip id="view-progress-tooltip" />
      </>
    ),
  },
];

const BatchReportTable: FC<BatchReportTableProps> = ({ studentReports }) => {
  const [reports, setReports] = useState<StudentReport[]>([]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data: reports,
    columns,
    debugTable: true,
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    setReports(studentReports);
  }, [studentReports]);

  return (
    <div className="flex flex-col w-full gap-10">
      <div className="rounded-xl bg-darkBlack border-2 border-[#636363]">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-[#636363]">
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    <div className="p-1 text-xs text-center text-white tablet:p-3 tablet:text-lg">
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
                    <div className="flex items-center justify-center p-1 text-xs text-center tablet:p-2 tablet:text-md">
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
        <div className="flex items-center justify-center gap-5 p-2 mt-3">
          <button
            type="button"
            className="flex items-center justify-center p-2 font-semibold text-center text-black duration-150 ease-in-out rounded-lg text-md bg-white/80 hover:bg-white disabled:bg-white/30"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <MdNavigateBefore />
          </button>
          <p>{table.getState().pagination.pageIndex + 1}</p>
          <button
            type="button"
            className="flex items-center justify-center p-2 font-semibold text-center text-black duration-150 ease-in-out rounded-lg text-md bg-white/80 hover:bg-white disabled:bg-white/30"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <MdNavigateNext />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BatchReportTable;
