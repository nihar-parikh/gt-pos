import eventBus from '@gtpos/core/event-bus';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { InventoryService } from './inventory.service';
import { useInventoryStore } from './zustand-store/use-inventory.store';
// Define InventoryItem type if not imported from elsewhere
type InventoryItem = {
  id: number;
  name: string;
  quantity: number;
};

export const useInventory = () => {
  const [form, setForm] = useState({ name: '', quantity: 0 });

  const { items, addItem } = useInventoryStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'quantity' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: InventoryItem = {
      id: Date.now(),
      name: form.name,
      quantity: form.quantity,
    };

    const invoice = {
      name: form.name,
      price: 0,
      quantity: form.quantity,
    };

    try {
      await InventoryService.createInvoice(invoice);
    } catch (error) {
      console.error('Error creating invoice:', error);
    }

    addItem(newItem);
    setForm({ name: '', quantity: 0 });
    eventBus.emit('toast', 'Item added successfully!');
  };

  const fetchInventoryItems = async () => {
    return InventoryService.getItems();
  };

  const useInventoryQuery = () => {
    return useQuery({
      queryKey: ['inventory'],
      queryFn: fetchInventoryItems,
    });
  };

  return {
    form,
    items,
    handleChange,
    handleSubmit,
    useInventoryQuery,
  };
};
