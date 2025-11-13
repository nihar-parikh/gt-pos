import { flexRender, Table as TableType } from '@tanstack/react-table';

type TableHeaderProps<TData> = {
  table: TableType<TData>;
};

export const TableHeader = <TData,>({ table }: TableHeaderProps<TData>) => {
  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              className="p-2 bg-gray-100 border-b cursor-pointer"
            >
              <div
                onClick={header.column.getToggleSortingHandler()}
                className="flex items-center justify-between gap-2"
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
                {{
                  asc: '↑',
                  desc: '↓',
                }[header.column.getIsSorted() as string] ?? null}
              </div>

              {header.column.getCanFilter() && (
                <div>
                  <input
                    type="text"
                    value={(header.column.getFilterValue() ?? '') as string}
                    onChange={(e) =>
                      header.column.setFilterValue(e.target.value)
                    }
                    placeholder="Filter..."
                    className="mt-1 w-full border px-2 py-1 text-sm"
                  />
                </div>
              )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};
