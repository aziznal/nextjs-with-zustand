import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Counter {
  count: number;
  increment: () => void;
  decrement: () => void;
}

export const useCounterStore = create(
  persist<Counter>(
    (set, get) => ({
      count: 0,
      increment: () => set({ ...get(), count: get().count + 1 }),
      decrement: () => set({ ...get(), count: get().count - 1 }),
    }),
    {
      name: "counter-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
