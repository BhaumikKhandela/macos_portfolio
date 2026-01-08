import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { locations } from "../../constants";

const DEFAULT_LOCATION = locations.work;

export type LocationKeyType = keyof typeof locations;
export type LocationType = (typeof locations)[LocationKeyType];
export type LocationChild = LocationType["children"][number];

export type ActiveItem = LocationType | LocationChild ;

type LocationStore = {
  activeLocation: ActiveItem;
  setActiveLocation: (location: ActiveItem) => void;
  resetActiveLocation: () => void;
};
const useLocationStore = create<LocationStore>()(
  immer((set) => ({
    activeLocation: DEFAULT_LOCATION,

    setActiveLocation: (location) =>
      set((state) => {
        if (location === undefined) return
        state.activeLocation = location;
      }),

    resetActiveLocation: () =>
      set((state) => {
        state.activeLocation = DEFAULT_LOCATION;
      }),
  }))
);

export default useLocationStore;
