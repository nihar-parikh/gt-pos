// zustand-store/useLoginStore.ts
import { create } from 'zustand';

type LoginState = {
  token: string | null;
  user: string | null;
};

type LoginActions = {
  login: (token: string, user: string) => void;
  logout: () => void;
};

export const useLoginStore = create<LoginState & LoginActions>((set) => ({
  token: null,
  user: null,
  login: (token, user) => {
    set({ token, user });
    console.log('data >>>', { token, user });
  },
  logout: () => set({ token: null, user: null }),
}));
