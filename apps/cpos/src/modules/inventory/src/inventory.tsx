import { Can } from '@casl/react';
import { useAbility } from '@gtpos/core';
import { ColumnDef } from '@tanstack/react-table';
import {
  Button,
  TableContainer,
  Toast,
} from '../../../../src/shared/components/ui';
import { useInventory } from './use-inventory';

export const Inventory = () => {
  const { form, handleChange, handleSubmit, useInventoryQuery } =
    useInventory();
  const ability = useAbility();
  const { data, isLoading, isError } = useInventoryQuery();
  const inventoryData = (data ?? []) as TableItem[];

  type TableItem = {
    id: number;
    name: string;
    stock: number;
  };

  const columns: ColumnDef<TableItem>[] = [
    {
      accessorKey: 'name',
      header: 'Item Name',
      cell: (info) => info.getValue(),
      filterFn: 'includesString',
    },
    {
      accessorKey: 'stock',
      header: 'Stock Qty',
      cell: (info) => info.getValue(),
    },
  ];

  return (
    <div className="w-full max-w-4xl p-8 bg-white rounded-2xl shadow space-y-8">
      <h1 className="text-3xl font-bold text-center text-primary">
        Inventory Management
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-gray-200 pt-6"
      >
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Item Name
          </label>
          <input
            name="name"
            type="text"
            placeholder="Enter item name"
            value={form.name}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Quantity
          </label>
          <input
            name="quantity"
            type="number"
            placeholder="Enter quantity"
            value={form.quantity}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            min={0}
            required
          />
        </div>

        <Can I="create" a="sales_invoice" ability={ability}>
          <div className="sm:col-span-2 text-center">
            <Button
              title="Add Item"
              type="submit"
              className="w-full sm:w-auto"
            />
          </div>
        </Can>
      </form>

      <div className="border-t border-gray-200 pt-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Inventory List
        </h2>

        {isLoading ? (
          <p className="text-gray-500">Loading...</p>
        ) : isError ? (
          <p className="text-red-500">Failed to fetch inventory data.</p>
        ) : (
          <TableContainer data={inventoryData} columns={columns} />
        )}
      </div>

      <Toast />
    </div>
  );
};

export default Inventory;
