import { create } from "zustand";
import { persist } from "zustand/middleware";

type ShuffleMode = {
  mode: boolean;
  setMode: (mode: boolean) => void;
};

export const shuffleMode = create<ShuffleMode>()(
  persist(
    (set) => ({
      mode: false,
      setMode: (mode) => set((state) => ({ mode: mode })),
    }),
    { name: "shuffle" }
  )
);
