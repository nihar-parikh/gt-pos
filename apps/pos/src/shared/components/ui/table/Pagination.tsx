import { Table } from '@tanstack/react-table';

type PaginationProps<TData> = {
  table: Table<TData>;
};

export const Pagination = <TData,>({ table }: PaginationProps<TData>) => {
  return (
    <div className="flex items-center justify-between mt-2">
      <button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Previous
      </button>

      <div className="text-sm">
        Page {table.getState().pagination.pageIndex + 1} of{' '}
        {table.getPageCount()}
      </div>

      <button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};
