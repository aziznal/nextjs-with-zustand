import { z } from "zod";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type ExampleForm = z.infer<typeof formSchema> & {
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
};

export const useExampleFormStore = create(
  persist<ExampleForm>(
    (set, get) => ({
      email: get()?.email ?? "",
      password: get()?.password ?? "",
      setEmail: (email: string) => set({ email }),
      setPassword: (password: string) => set({ password }),
    }),
    {
      name: "counter-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
