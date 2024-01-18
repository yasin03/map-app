import { create } from "zustand";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export interface Marker {
  id: string;
  color: string;
  coordinate: { latitude: number; longitude: number };
  name: string;
}

interface MarkerStore {
  markers: Marker[];
  addMarker: (marker: Omit<Marker, "id">) => void;
  updateMarker: (id: string, updatedMarker: Partial<Marker>) => void;
  clearMarkers: () => void;
  removeMarker: (id: string) => void;
}

const useMarkerStore = create<MarkerStore>((set) => ({
  markers: [],
  addMarker: (marker) =>
    set((state) => ({
      markers: [...state.markers, { ...marker, id: uuidv4() }],
    })),
  updateMarker: (id, updatedMarker) =>
    set((state) => ({
      markers: state.markers.map((marker) =>
        marker.id === id ? { ...marker, ...updatedMarker } : marker
      ),
    })),
  removeMarker: (id) =>
    set((state) => ({
      markers: state.markers.filter((marker) => marker.id !== id),
    })),
  clearMarkers: () => set({ markers: [] }),
}));

export default useMarkerStore;
