/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo, useEffect, useState } from 'react';
import swal from 'sweetalert';
import { isAxiosError } from 'axios';
import { BiSolidTrash } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
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
  FilterFn,
} from '@tanstack/react-table';

import { TeacherV2 } from '@interfaces/apis/teacher';
import { accountDeletionRequest } from '@services/student';
import { useAuthStore } from '@store/authStore';

import { ERRORS } from '@constants/app';

export interface ViewAllTeachersSectionProps {
  teachers: TeacherV2[];
}

const ViewAllTeachersSection: FC<ViewAllTeachersSectionProps> = ({
  teachers,
}) => {
  const navigate = useNavigate();
  const authToken = useAuthStore((state) => state.authToken);

  const deleteAccount = async (userId: number) => {
    swal({
      title: 'Are you certain you want to delete the account ?',
      text: `Once deleted you can't access the account anymore.`,
      icon: 'warning',
      buttons: ['Cancel', 'Ok'],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const res = await accountDeletionRequest(userId, authToken!);
          if (res.status === 200) {
            swal('Account deleted successfully', {
              icon: 'success',
            }).then(() => {
              navigate(0);
            });
          }
        } catch (error) {
          if (isAxiosError(error)) {
            const status = error.response?.status;
            if (status === 401 || status === 403) {
              swal(error.response?.data?.message || ERRORS.SERVER_ERROR, {
                icon: 'error',
              });
            } else {
              swal(ERRORS.SERVER_ERROR, {
                icon: 'error',
              });
            }
          } else {
            swal(ERRORS.SERVER_ERROR, {
              icon: 'error',
            });
          }
        }
      }
    });
  };

  const firstNameCmp = memo<{ column: any }>(({ column }) => {
    return (
      <button
        type="button"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        First Name
      </button>
    );
  });
  firstNameCmp.displayName = '';

  const lastNameCmp = memo<{ column: any }>(({ column }) => {
    return (
      <button
        type="button"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Last Name
      </button>
    );
  });
  lastNameCmp.displayName = '';

  const tagNameCmp = memo<{ column: any }>(({ column }) => {
    return (
      <button
        type="button"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Tag Name
      </button>
    );
  });
  tagNameCmp.displayName = '';

  const actionButtons = memo<{ row: any }>(({ row }) => (
    <button
      type="button"
      className="flex items-center justify-center p-2 font-semibold text-center text-black duration-150 ease-in-out rounded-lg text-md bg-gold/80 hover:bg-gold"
      onClick={() => deleteAccount(row.getValue('userId'))}
    >
      <BiSolidTrash />
    </button>
  ));
  actionButtons.displayName = '';

  const columns: ColumnDef<TeacherV2>[] = [
    {
      accessorKey: 'firstName',
      header: firstNameCmp,
    },
    {
      accessorKey: 'lastName',
      header: lastNameCmp,
    },
    {
      accessorKey: 'tag',
      header: tagNameCmp,
    },
    {
      accessorKey: 'userId',
      header: 'Actions',
      cell: actionButtons,
    },
  ];

  const [teacherDetails, setTeacherDetails] = useState<TeacherV2[]>([]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 8,
  });

  const customGlobalFilterFn: FilterFn<TeacherV2> = (
    row,
    _columnId,
    filterValue
  ) => {
    const firstName = row.getValue('firstName') as string;
    const lastName = row.getValue('lastName') as string;
    const tag = row.getValue('tag') as string;

    return (
      firstName.toLowerCase().includes(filterValue.toLowerCase()) ||
      lastName.toLowerCase().includes(filterValue.toLowerCase()) ||
      tag.toLowerCase().includes(filterValue.toLowerCase())
    );
  };

  const table = useReactTable({
    data: teacherDetails,
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
    setTeacherDetails(teachers);
  }, [teachers]);

  return (
    <div className="flex flex-col gap-10 px-6 py-2 justify-evenly tablet:justify-between tablet:items-center tablet:p-10 desktop:px-36">
      <div className="flex flex-col w-full gap-10">
        <p className="text-xl font-bold text-gold">All Teachers</p>
        <input
          type="text"
          className="p-2 text-black rounded-lg focus:outline-none placeholder:text-grey"
          placeholder="Search teacher..."
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

export default ViewAllTeachersSection;
