import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface LocationSectionProps {
  location: string;
  setLocation: (value: string) => void;
  isGettingLocation: boolean;
  handleLocation: () => void;
  error: string | null;
}

export default function LocationSection({
  location,
  setLocation,
  isGettingLocation,
  handleLocation,
  error
}: LocationSectionProps) {
  return (
    <div className="space-y-2">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <label className="text-sm font-medium text-gray-700">
        Localisation <span className="text-red-500">*</span>
      </label>
      <div className="flex gap-2">
        <Input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Coordonnées GPS"
          required
          disabled={isGettingLocation}
        />
        <Button
          type="button"
          onClick={handleLocation}
          variant="outline"
          size="icon"
          disabled={isGettingLocation}
        >
          <MapPin className={`h-4 w-4 ${isGettingLocation ? 'animate-spin' : ''}`} />
        </Button>
      </div>
    </div>
  );
}