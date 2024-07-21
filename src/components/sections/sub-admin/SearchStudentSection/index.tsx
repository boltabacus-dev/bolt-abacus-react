import { FC, memo, useEffect, useState } from 'react';
import { isAxiosError } from 'axios';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
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
  Column,
  Row,
} from '@tanstack/react-table';
import swal from 'sweetalert';

import FormButton from '@components/atoms/FormButton';
import FormInput from '@components/atoms/FormInput';
import ErrorMessage from '@components/atoms/ErrorMessage';

import { useAuthStore } from '@store/authStore';
import { searchStudentSchema } from '@validations/admin';
import { searchStudentsRequest } from '@services/admin';
import { accountDeactivationRequest } from '@services/student';

import { SearchStudent } from '@interfaces/StudentsFile';
import { SearchStudentsResponse } from '@interfaces/apis/admin';

import { ERRORS } from '@constants/app';
import { SUB_ADMIN_STUDENT_PROGRESS } from '@constants/routes';

export interface SearchStudentSectionProps {}

const SearchStudentSection: FC<SearchStudentSectionProps> = () => {
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

  const firstNameCmp = memo<{ column: Column<SearchStudent, unknown> }>(
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

  const lastNameCmp = memo<{ column: Column<SearchStudent, unknown> }>(
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

  const emailCmp = memo<{ column: Column<SearchStudent, unknown> }>(
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

  const phoneCmp = memo<{ column: Column<SearchStudent, unknown> }>(
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

  const batchCmp = memo<{ column: Column<SearchStudent, unknown> }>(
    ({ column }) => {
      return (
        <button
          type="button"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Batch
        </button>
      );
    }
  );
  batchCmp.displayName = '';

  const actionButtons = memo<{ row: Row<SearchStudent> }>(({ row }) => (
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
          to={`${SUB_ADMIN_STUDENT_PROGRESS}/${row.original.userId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <BiSolidReport />
        </Link>
      </button>
    </div>
  ));
  actionButtons.displayName = '';

  const columns: ColumnDef<SearchStudent>[] = [
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
      accessorKey: 'batchName',
      header: batchCmp,
    },
    {
      accessorKey: 'userId',
      header: 'Actions',
      cell: actionButtons,
    },
  ];

  const [studentDetails, setStudentDetails] = useState<SearchStudent[]>([]);
  const [firstTime, setFirstTime] = useState<boolean>(true);

  const [apiError, setApiError] = useState('');

  const formMethods = useForm({
    resolver: zodResolver(searchStudentSchema),
  });

  const isFormLoading = formMethods.formState.isSubmitting;

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 8,
  });

  const table = useReactTable({
    data: studentDetails,
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

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await searchStudentsRequest(data?.name, authToken!);
      const searchStudentResponse: SearchStudentsResponse = res.data;
      setStudentDetails(searchStudentResponse.students);
      setApiError('');
    } catch (error) {
      if (isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          setApiError(
            error.response?.data?.error ||
              error.response?.data?.message ||
              ERRORS.SERVER_ERROR
          );
        } else {
          setApiError(ERRORS.SERVER_ERROR);
        }
      } else {
        setApiError(ERRORS.SERVER_ERROR);
      }
    }
    setFirstTime(false);
  };

  useEffect(() => {
    setStudentDetails([]);
  }, []);

  return (
    <div className="flex flex-col gap-10 px-6 py-2 justify-evenly tablet:justify-between tablet:items-center tablet:p-10 desktop:px-36">
      <div className="flex flex-col w-full gap-10 overflow-scroll ">
        <p className="text-xl font-bold text-gold">Search Student</p>
        <div className="tablet:w-full">
          <FormProvider {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(onSubmit)}>
              <FormInput
                type="text"
                name="name"
                placeholder="enter student name..."
                label="Student Name *"
                disabled={isFormLoading}
                fullWidth
              />
              <FormButton
                width="full"
                text="Search"
                isLoading={isFormLoading}
              />
              {apiError !== '' ? (
                <div className="flex justify-center text-xl text-center">
                  <ErrorMessage errMessage={apiError} iconRequired />
                </div>
              ) : null}
            </form>
          </FormProvider>
        </div>
        {firstTime || apiError !== '' ? (
          <div />
        ) : studentDetails.length === 0 ? (
          <div className="flex justify-center items-center">
            <p className="text-md font-bold tablet:text-lg">
              No Student Found !
            </p>
          </div>
        ) : (
          <div className="text-xs border bg-darkBlack border-gold rounded-xl">
            <table className="w-full">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="border-b border-gold">
                    {headerGroup.headers.map((header) => (
                      <th key={header.id}>
                        <div className="p-1 text-center text-gold/80 tablet:p-3 tablet:text-md">
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
                  <tr key={row.id} className="text-xxs tablet:text-md">
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
        )}
      </div>
    </div>
  );
};

export default SearchStudentSection;
