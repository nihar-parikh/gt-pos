import { Cell, flexRender } from '@tanstack/react-table';

type TableCellProps<TData> = {
  cell: Cell<TData, unknown>;
};

export const TableCell = <TData,>({ cell }: TableCellProps<TData>) => (
  <td className="px-4 py-2 border">
    {flexRender(cell.column.columnDef.cell, cell.getContext())}
  </td>
);
