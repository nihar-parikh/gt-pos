// zustand-store/src/useAppStore.ts
import { create } from 'zustand';
export type InventoryItem = {
  id: number;
  name: string;
  quantity: number;
  price?: number; // Optional price field
};

type State = {
  items: InventoryItem[];
};
type Actions = {
  addItem: (item: InventoryItem) => void;
  resetInventory: () => void;
};

export const useInventoryStore = create<State & Actions>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      return {
        items: [...state.items, item],
      };
    }),
  resetInventory: () => set({ items: [] }),
}));
