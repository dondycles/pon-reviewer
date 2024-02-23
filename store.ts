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
type Score = {
  score: number;
  setScore: (score: number) => void;
};

export const useScore = create<Score>()((set) => ({
  score: 0,
  setScore: (score) => set((state) => ({ score: score })),
}));
