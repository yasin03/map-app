import { create } from "zustand";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

interface Marker {
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
}

const useMarkerStore = create<MarkerStore>((set) => ({
  markers: [
    {
      coordinate: {
        longitude: 41.103065,
        latitude: 28.990749,
      },
      name: "Galatasaray",
      color: "#FF0000",
      id: uuidv4(),
    },
    {
      coordinate: {
        longitude: 40.987501,
        latitude: 29.037051,
      },
      name: "Fenerbahçe",
      color: "#120a8f",
      id: uuidv4(),
    },
  ],
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
  clearMarkers: () => set({ markers: [] }),
}));

export default useMarkerStore;
