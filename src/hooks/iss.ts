import create from "zustand";

export type FocusTarget = "earth" | "iss";

export type IssStore = {
  position: {
    x: number;
    y: number;
    z: number;
  };
  previousPosition: {
    x: number;
    y: number;
    z: number;
  };
  setPosition: (position: { x: number; y: number; z: number }) => void;
};

export const useIss = create<IssStore>((set) => ({
  position: {
    x: 0,
    y: 0,
    z: 0,
  },
  previousPosition: {
    x: 0,
    y: 0,
    z: 0,
  },
  setPosition: (position) =>
    set((state) => ({
      ...state,
      position,
      previousPosition: state.position,
    })),
}));
