import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { INCIDENT_CATEGORIES } from "@/lib/constants";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";

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
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState("");
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const validateMapboxToken = (token: string) => {
    if (!token.startsWith('pk.')) {
      throw new Error("Le token Mapbox doit commencer par 'pk.'");
    }
    return true;
  };

  const initializeMap = async () => {
    if (!mapContainer.current || !mapboxToken) return;

    setIsLoading(true);
    setError(null);

    try {
      console.log("Tentative d'initialisation de la carte avec le token:", mapboxToken);
      validateMapboxToken(mapboxToken);
      
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [2.3522, 48.8566] as [number, number],
        zoom: 12,
      });

      console.log("Carte créée, attente du chargement...");

      await new Promise((resolve, reject) => {
        if (!map.current) {
          reject(new Error("La carte n'a pas pu être initialisée"));
          return;
        }

        map.current.on('load', () => {
          console.log("Carte chargée avec succès");
          resolve(true);
        });

        map.current.on('error', (e) => {
          console.error("Erreur lors du chargement de la carte:", e);
          reject(new Error("Erreur lors du chargement de la carte"));
        });

        // Timeout de sécurité
        setTimeout(() => {
          reject(new Error("Timeout lors du chargement de la carte"));
        }, 10000);
      });

      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
      map.current.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        })
      );

      mockIncidents.forEach((incident) => {
        const category = INCIDENT_CATEGORIES.find(
          (cat) => cat.id === incident.categoryId
        );

        if (category) {
          const el = document.createElement("div");
          el.className = "marker";
          const IconComponent = category.icon;
          const iconSvg = document.createElement('div');
          iconSvg.className = category.color;
          iconSvg.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${IconComponent({}).toString()}</svg>`;
          el.appendChild(iconSvg);

          new mapboxgl.Marker(el)
            .setLngLat(incident.location)
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }).setHTML(`
                <div class="p-2">
                  <h3 class="font-medium">${category.label}</h3>
                  <p class="text-sm text-gray-600">Status: ${incident.status}</p>
                </div>
              `)
            )
            .addTo(map.current!);
        }
      });

      setIsMapInitialized(true);
      toast({
        title: "Carte initialisée",
        description: "La carte a été chargée avec succès",
      });
    } catch (err) {
      console.error("Erreur lors de l'initialisation de la carte:", err);
      const errorMessage = err instanceof Error ? err.message : "Une erreur inconnue est survenue";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isMapInitialized && mapboxToken) {
      initializeMap();
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [mapboxToken, isMapInitialized]);

  if (!isMapInitialized) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Carte des incidents</h2>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>Cliquez sur la carte pour signaler un incident</span>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <p className="text-gray-600">
            Pour utiliser la carte, veuillez entrer votre token public Mapbox.
            Vous pouvez le trouver sur votre tableau de bord Mapbox après avoir créé un compte sur{" "}
            <a
              href="https://www.mapbox.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              mapbox.com
            </a>
          </p>
          <div className="flex gap-2">
            <Input
              type="text"
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              placeholder="Entrez votre token public Mapbox (commençant par pk.)"
              className="flex-1"
              disabled={isLoading}
            />
            <Button 
              onClick={initializeMap} 
              disabled={!mapboxToken || isLoading}
            >
              {isLoading ? (
                <>
                  <span className="animate-spin mr-2">⚡</span>
                  Initialisation...
                </>
              ) : (
                "Initialiser la carte"
              )}
            </Button>
          </div>
        </div>
      </div>
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
      </div>
    </div>
  );
}