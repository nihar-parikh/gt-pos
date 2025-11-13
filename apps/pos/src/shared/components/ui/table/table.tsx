import { Table as TableType } from '@tanstack/react-table';

import { Pagination } from './Pagination';
import { TableBody } from './tbody';
import { TableHeader } from './th';

interface TableProps<TData extends { id: string | number }> {
  table: TableType<TData>;
}

export const Table = <TData extends { id: string | number }>({
  table,
}: TableProps<TData>) => {
  return (
    <div className="space-y-4">
      <table className="min-w-full border border-gray-200">
        <TableHeader table={table} />
        <TableBody table={table} />
      </table>

      <Pagination table={table} />
    </div>
  );
};
