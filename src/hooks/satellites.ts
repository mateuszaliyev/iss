import create from "zustand";
import { persist } from "zustand/middleware";

export type Satellite = {
  color: string;
  tle: string;
};

export type SatellitesStore = {
  addSatellite: (satellite: Satellite) => void;
  satellites: Satellite[];
};

export const useSatellites = create(
  persist<SatellitesStore>(
    (set) => ({
      addSatellite: (satellite) =>
        set((state) => ({
          ...state,
          satellites: [...state.satellites, satellite],
        })),
      satellites: [],
    }),
    {
      name: "satellites",
    }
  )
);
