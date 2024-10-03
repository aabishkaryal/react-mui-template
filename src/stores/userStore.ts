import { Prettify } from "@utils/prettify";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  name?: string;
  email?: string;
  privileges?: string[];
  role?: string;
  token?: string;
};

type Action = {
  updateUser: (user: User) => void;
  reset: () => void;
};

const initialState: User = {};

// Create your store, which includes both state and (optionally) actions
const useUserStore = create<Prettify<User & Action>>()(
    persist(
      (set) => ({
        ...initialState,
        updateUser: (user: User) => set(() => user),
        reset: () => set(() => initialState),
      }),
      { name: "user-storage" }
    )
);

export default useUserStore;
