import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, MapPin } from "lucide-react";

interface MapboxTokenFormProps {
  mapboxToken: string;
  setMapboxToken: (token: string) => void;
  error: string | null;
  isLoading: boolean;
  onInitialize: () => void;
}

export const MapboxTokenForm = ({
  mapboxToken,
  setMapboxToken,
  error,
  isLoading,
  onInitialize
}: MapboxTokenFormProps) => {
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
            onClick={onInitialize} 
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
};