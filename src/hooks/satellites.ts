import create from "zustand";
import { persist } from "zustand/middleware";

import { generateId } from "@/utilities/generate-id";

export type Satellite = {
  color: string;
  id: string;
  tle: string;
};

export type SatellitesStore = {
  addSatellite: (satellite: Omit<Satellite, "id">) => Promise<void>;
  removeSatellite: (id: string) => void;
  satellites: Satellite[];
};

export const useSatellites = create(
  persist<SatellitesStore>(
    (set) => ({
      addSatellite: async (satellite) => {
        const id = await generateId();

        set((state) => ({
          ...state,
          satellites: [
            ...state.satellites,
            {
              ...satellite,
              id,
            },
          ],
        }));
      },
      removeSatellite: (id) =>
        set((state) => ({
          ...state,
          satellites: state.satellites.filter(
            (satellite) => satellite.id !== id
          ),
        })),
      satellites: [],
    }),
    {
      name: "satellites",
    }
  )
);
