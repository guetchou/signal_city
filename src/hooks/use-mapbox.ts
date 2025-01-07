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
    console.log("Validation du token Mapbox:", token);
    if (!token) {
      throw new Error("Le token Mapbox est requis");
    }
    if (!token.startsWith('pk.')) {
      throw new Error("Le token Mapbox doit commencer par 'pk.'");
    }
    if (token.length < 50) {
      throw new Error("Le token Mapbox semble invalide (trop court)");
    }
    return true;
  };

  const initializeMap = async () => {
    if (!mapContainer.current || !mapboxToken) {
      console.error("Container ou token manquant");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log("Tentative d'initialisation de la carte avec le token:", mapboxToken);
      validateMapboxToken(mapboxToken);
      
      // Configuration de Mapbox
      mapboxgl.accessToken = mapboxToken;
      
      console.log("Création de l'instance de la carte...");
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [2.3522, 48.8566], // Paris
        zoom: 12,
      });

      console.log("Attente du chargement de la carte...");

      // Promesse pour attendre le chargement de la carte
      await new Promise((resolve, reject) => {
        if (!map.current) {
          reject(new Error("La carte n'a pas pu être initialisée"));
          return;
        }

        const timeoutId = setTimeout(() => {
          reject(new Error("Timeout lors du chargement de la carte (10s)"));
        }, 10000);

        map.current.on('load', () => {
          console.log("Carte chargée avec succès");
          clearTimeout(timeoutId);
          resolve(true);
        });

        map.current.on('error', (e) => {
          console.error("Erreur lors du chargement de la carte:", e);
          clearTimeout(timeoutId);
          reject(new Error(`Erreur lors du chargement de la carte: ${e.error?.message || 'Erreur inconnue'}`));
        });
      });

      // Ajout des contrôles une fois la carte chargée
      console.log("Ajout des contrôles de navigation...");
      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
      
      console.log("Ajout du contrôle de géolocalisation...");
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
        title: "Succès",
        description: "La carte a été initialisée avec succès",
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

  // Nettoyage lors du démontage du composant
  useEffect(() => {
    return () => {
      if (map.current) {
        console.log("Nettoyage de la carte...");
        map.current.remove();
      }
    };
  }, []);

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