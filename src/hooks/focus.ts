import create from "zustand";

export type FocusTarget = "earth" | "iss";

export type FocusStore = {
  focus: "earth" | "iss";
  toggleFocus: (focus?: FocusTarget) => void;
};

export const useFocus = create<FocusStore>((set) => ({
  focus: "iss",
  toggleFocus: (focus) =>
    set((state) => ({
      ...state,
      focus: focus ?? state.focus === "earth" ? "iss" : "earth",
    })),
}));
