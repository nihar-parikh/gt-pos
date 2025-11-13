// zustand-store/src/useAppStore.ts
import { create } from 'zustand';
export type TenantOnboardingItem = {
  id: number;
  name: string;
  quantity: number;
  price?: number; // Optional price field
};

type State = {
  items: TenantOnboardingItem[];
};
type Actions = {
  addItem: (item: TenantOnboardingItem) => void;
  resetInventory: () => void;
};

export const useTenantOnboardingStore = create<State & Actions>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      return {
        items: [...state.items, item],
      };
    }),
  resetInventory: () => set({ items: [] }),
}));
