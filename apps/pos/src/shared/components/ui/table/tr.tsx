import { flexRender, Row } from '@tanstack/react-table';

interface Props<TData extends { id: number | string }> {
  row: Row<TData>;
  colSpan: number;
}

export const TableRow = <TData extends { id: number | string }>({
  row,
  colSpan,
}: Props<TData>) => {
  return (
    <>
      <tr
        className="hover:bg-gray-100 cursor-pointer"
        onClick={row.getToggleExpandedHandler()}
      >
        {row.getVisibleCells().map((cell) => (
          <td key={cell.id} className="border px-4 py-2">
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>

      {row.getIsExpanded() && (
        <tr>
          <td
            colSpan={colSpan}
            className="bg-gray-50 px-4 py-3 text-sm text-gray-700"
          >
            Expanded content for row ID: {row.original.id}
            <pre className="text-xs text-gray-500 mt-2">
              {JSON.stringify(row.original, null, 2)}
            </pre>
          </td>
        </tr>
      )}
    </>
  );
};
