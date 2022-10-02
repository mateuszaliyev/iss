import create from "zustand";

export type TimestampStore = {
  resetTimestamp: () => void;
  setTimestamp: (timestamp: number) => void;
  timestamp: number;
};

export const useTimestamp = create<TimestampStore>((set) => ({
  resetTimestamp: () =>
    set((state) => ({
      ...state,
      timestamp: Date.now(),
    })),
  setTimestamp: (timestamp) =>
    set((state) => ({
      ...state,
      timestamp,
    })),
  timestamp: Date.now(),
}));
