import { useRef, useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import "mapbox-gl/dist/mapbox-gl.css";
import { useMapbox } from "@/hooks/use-mapbox";
import { MapboxTokenForm } from "./map/MapboxTokenForm";
import { MapMarkers } from "./map/MapMarkers";
import { useToast } from "@/hooks/use-toast";

type Incident = {
  id: number;
  categoryId: string;
  location: [number, number];
  status: string;
};

const mockIncidents: Incident[] = [
  {
    id: 1,
    categoryId: "pothole",
    location: [2.3522, 48.8566] as [number, number],
    status: "PENDING",
  },
  {
    id: 2,
    categoryId: "lighting",
    location: [2.3622, 48.8666] as [number, number],
    status: "IN_PROGRESS",
  },
];

export default function IncidentMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [isContainerReady, setIsContainerReady] = useState(false);
  
  const {
    map,
    mapboxToken,
    setMapboxToken,
    isMapInitialized,
    error,
    isLoading,
    initializeMap
  } = useMapbox(mapContainer);

  useEffect(() => {
    console.log("Vérification du container de la carte...");
    if (mapContainer.current) {
      console.log("Container de la carte trouvé et prêt");
      setIsContainerReady(true);
    } else {
      console.error("Container de la carte non trouvé");
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Container de la carte non trouvé",
      });
    }
  }, []);

  if (!isContainerReady) {
    console.log("En attente de l'initialisation du container...");
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="h-[400px] flex items-center justify-center">
          <p>Chargement de la carte...</p>
        </div>
      </div>
    );
  }

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