import { Prettify } from "@/types/prettify";
import { User } from "@/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

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
