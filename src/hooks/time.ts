import create from "zustand";

export type TimeStore = {
  getTime: () => number;
  offset: number;
  setOffset: (offset: number) => void;
  setOffsetFromDate: (date: Date) => void;
  timestamp: number;
  updateTimestamp: () => void;
};

export const useTime = create<TimeStore>((set, get) => ({
  getTime: () => get().timestamp + get().offset,
  offset: 0,
  setOffset: (offset) =>
    set((state) => ({
      ...state,
      offset,
    })),
  setOffsetFromDate: (date) =>
    set((state) => ({
      ...state,
      offset: date.getTime() - get().timestamp,
    })),
  timestamp: Date.now(),
  updateTimestamp: () =>
    set((state) => ({
      ...state,
      timestamp: Date.now(),
    })),
}));
