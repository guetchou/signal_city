import { useRef } from "react";
import { MapPin } from "lucide-react";
import "mapbox-gl/dist/mapbox-gl.css";
import { useMapbox } from "@/hooks/use-mapbox";
import { MapboxTokenForm } from "./map/MapboxTokenForm";
import { MapMarkers } from "./map/MapMarkers";

const mockIncidents = [
  {
    id: 1,
    categoryId: "pothole",
    location: [2.3522, 48.8566],
    status: "PENDING",
  },
  {
    id: 2,
    categoryId: "lighting",
    location: [2.3622, 48.8666],
    status: "IN_PROGRESS",
  },
];

export default function IncidentMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const {
    map,
    mapboxToken,
    setMapboxToken,
    isMapInitialized,
    error,
    isLoading,
    initializeMap
  } = useMapbox(mapContainer);

  if (!isMapInitialized) {
    return (
      <MapboxTokenForm
        mapboxToken={mapboxToken}
        setMapboxToken={setMapboxToken}
        error={error}
        isLoading={isLoading}
        onInitialize={initializeMap}
      />
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Carte des incidents</h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="h-4 w-4" />
          <span>Cliquez sur la carte pour signaler un incident</span>
        </div>
      </div>
      <div className="h-[400px] rounded-lg overflow-hidden">
        <div ref={mapContainer} className="w-full h-full" />
        <MapMarkers map={map} incidents={mockIncidents} />
      </div>
    </div>
  );
}