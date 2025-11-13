import { Table as TableType } from '@tanstack/react-table';
import { TableRow } from './tr';

type TableBodyProps<TData extends { id: string | number }> = {
  table: TableType<TData>;
};

export const TableBody = <TData extends { id: string | number }>({
  table,
}: TableBodyProps<TData>) => {
  return (
    <tbody>
      {table.getRowModel().rows.map((row) => (
        <TableRow
          key={row.id}
          row={row}
          colSpan={row.getVisibleCells().length}
        />
      ))}
    </tbody>
  );
};
