import type { ExpandedState, SortingState } from '@tanstack/react-table';
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { Table } from './table';

interface Props<TData extends { id: string | number }> {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
}

export const TableContainer = <TData extends { id: string | number }>({
  data,
  columns,
}: Props<TData>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      expanded,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowCanExpand: () => true,
  });

  return (
    <div className="overflow-x-auto">
      <Table table={table} />
    </div>
  );
};
