import { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { useToast } from "@/components/ui/use-toast";

export const useMapbox = (mapContainer: React.RefObject<HTMLDivElement>) => {
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
        center: [2.3522, 48.8566],
        zoom: 12,
      });

      console.log("Carte créée, attente du chargement...");

      await new Promise((resolve, reject) => {
        if (!map.current) {
          reject(new Error("La carte n'a pas pu être initialisée"));
          return;
        }

        const timeoutId = setTimeout(() => {
          reject(new Error("Timeout lors du chargement de la carte"));
        }, 10000);

        map.current.on('load', () => {
          console.log("Carte chargée avec succès");
          clearTimeout(timeoutId);
          resolve(true);
        });

        map.current.on('error', (e) => {
          console.error("Erreur lors du chargement de la carte:", e);
          clearTimeout(timeoutId);
          reject(new Error("Erreur lors du chargement de la carte"));
        });
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

  return {
    map: map.current,
    mapboxToken,
    setMapboxToken,
    isMapInitialized,
    error,
    isLoading,
    initializeMap
  };
};