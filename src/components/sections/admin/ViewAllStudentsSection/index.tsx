import { FC, memo, useEffect, useState } from 'react';
import { isAxiosError } from 'axios';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { BiSolidLock, BiSolidReport } from 'react-icons/bi';
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
  Column,
  Row,
} from '@tanstack/react-table';
import swal from 'sweetalert';

import { useAuthStore } from '@store/authStore';
import { accountDeactivationRequest } from '@services/student';
import { AdminStudent } from '@interfaces/StudentsFile';

import { ERRORS } from '@constants/app';
import { ADMIN_STUDENT_PROGRESS } from '@constants/routes';

export interface ViewAllStudentsSectionProps {
  students: AdminStudent[];
}

const ViewAllStudentsSection: FC<ViewAllStudentsSectionProps> = ({
  students,
}) => {
  const navigate = useNavigate();
  const authToken = useAuthStore((state) => state.authToken);

  const deactivateAccount = async (userId: number) => {
    swal({
      title: 'Are you certain you want to deactivate the account ?',
      text: `Once deactivated the student can't access the account anymore.`,
      icon: 'warning',
      buttons: ['Cancel', 'Ok'],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const res = await accountDeactivationRequest(userId, authToken!);
          if (res.status === 200) {
            swal('Account deactivated successfully', {
              icon: 'success',
            }).then(() => {
              navigate(0);
            });
          }
        } catch (error) {
          if (isAxiosError(error)) {
            const status = error.response?.status;
            if (status === 401 || status === 403 || status === 409) {
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

  const firstNameCmp = memo<{ column: Column<AdminStudent, unknown> }>(
    ({ column }) => {
      return (
        <button
          type="button"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          First Name
        </button>
      );
    }
  );
  firstNameCmp.displayName = '';

  const lastNameCmp = memo<{ column: Column<AdminStudent, unknown> }>(
    ({ column }) => {
      return (
        <button
          type="button"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Last Name
        </button>
      );
    }
  );
  lastNameCmp.displayName = '';

  const emailCmp = memo<{ column: Column<AdminStudent, unknown> }>(
    ({ column }) => {
      return (
        <button
          type="button"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
        </button>
      );
    }
  );
  emailCmp.displayName = '';

  const phoneCmp = memo<{ column: Column<AdminStudent, unknown> }>(
    ({ column }) => {
      return (
        <button
          type="button"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Phone
        </button>
      );
    }
  );
  phoneCmp.displayName = '';

  const actionButtons = memo<{ row: Row<AdminStudent> }>(({ row }) => (
    <div className="flex gap-2">
      <button
        type="button"
        className="flex items-center justify-center p-2 font-semibold text-center text-black duration-150 ease-in-out rounded-lg text-md bg-gold/80 hover:bg-gold disabled:bg-gold/50"
        onClick={() => deactivateAccount(row.original.userId)}
        disabled={row.original.blocked}
      >
        <BiSolidLock />
      </button>
      <button
        type="button"
        className="flex items-center justify-center p-2 font-semibold text-center text-black duration-150 ease-in-out rounded-lg text-md bg-gold/80 hover:bg-gold"
      >
        <Link
          to={`${ADMIN_STUDENT_PROGRESS}/${row.original.userId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <BiSolidReport />
        </Link>
      </button>
    </div>
  ));
  actionButtons.displayName = '';

  const columns: ColumnDef<AdminStudent>[] = [
    {
      accessorKey: 'firstName',
      header: firstNameCmp,
    },
    {
      accessorKey: 'lastName',
      header: lastNameCmp,
    },
    {
      accessorKey: 'email',
      header: emailCmp,
    },
    {
      accessorKey: 'phoneNumber',
      header: phoneCmp,
    },
    {
      id: 'userId',
      header: 'Actions',
      cell: actionButtons,
    },
  ];

  const [studentDetails, setStudentDetails] = useState<AdminStudent[]>([]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 8,
  });

  const customGlobalFilterFn: FilterFn<AdminStudent> = (
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
