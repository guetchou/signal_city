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
  console.log("IncidentMap component rendering");
  
  const mapContainer = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [isContainerReady, setIsContainerReady] = useState(false);
  const [containerError, setContainerError] = useState<string | null>(null);
  const [initAttempts, setInitAttempts] = useState(0);
  const maxAttempts = 5;
  
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
    console.log("Container initialization effect started");
    console.log("Current container state:", {
      containerRef: mapContainer.current,
      isContainerReady,
      containerError,
      initAttempts
    });

    const checkContainer = () => {
      if (mapContainer.current) {
        console.log("Container found, dimensions:", {
          width: mapContainer.current.offsetWidth,
          height: mapContainer.current.offsetHeight
        });
        setIsContainerReady(true);
        setContainerError(null);
        return true;
      }
      console.error(`Container check failed - attempt ${initAttempts + 1}/${maxAttempts}`);
      setInitAttempts(prev => prev + 1);
      return false;
    };

    // Initial check
    if (!checkContainer() && initAttempts < maxAttempts) {
      console.log("Setting up periodic container check");
      const interval = setInterval(() => {
        if (checkContainer() || initAttempts >= maxAttempts) {
          clearInterval(interval);
          if (initAttempts >= maxAttempts) {
            console.error("Max initialization attempts reached");
            setContainerError("Impossible d'initialiser le container de la carte après plusieurs tentatives");
            toast({
              variant: "destructive",
              title: "Erreur critique",
              description: "L'initialisation de la carte a échoué. Veuillez rafraîchir la page.",
            });
          }
        }
      }, 1000);

      return () => {
        console.log("Cleaning up container check interval");
        clearInterval(interval);
      };
    }
  }, [initAttempts, toast]);

  if (containerError) {
    console.log("Rendering error state:", containerError);
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="h-[400px] flex items-center justify-center flex-col gap-4">
          <p className="text-red-500">{containerError}</p>
          <button 
            onClick={() => {
              console.log("Retrying initialization");
              setInitAttempts(0);
              setContainerError(null);
              window.location.reload();
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  if (!isContainerReady) {
    console.log("Rendering loading state");
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="h-[400px] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p>Initialisation de la carte... ({initAttempts}/{maxAttempts})</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isMapInitialized) {
    console.log("Rendering token form");
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

  console.log("Rendering map");
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