import { Camera, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { INCIDENT_CATEGORIES } from "@/lib/constants";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function IncidentForm() {
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      // Validation basique
      if (!location || !category || !description) {
        setError("Veuillez remplir tous les champs obligatoires");
        return;
      }

      setIsSubmitting(true);
      console.log("Soumission du formulaire:", { location, category, description, image });
      
      // Simuler un délai réseau
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Signalement envoyé",
        description: "Votre signalement a été enregistré avec succès",
      });
      
      // Réinitialisation du formulaire
      setLocation("");
      setCategory("");
      setDescription("");
      setImage(null);
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      setError("Une erreur est survenue lors de l'envoi du signalement. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLocation = () => {
    if (!navigator.geolocation) {
      setError("La géolocalisation n'est pas supportée par votre navigateur");
      return;
    }

    setIsGettingLocation(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(`${position.coords.latitude}, ${position.coords.longitude}`);
        toast({
          title: "Localisation",
          description: "Position actuelle récupérée avec succès",
        });
        setIsGettingLocation(false);
      },
      (error) => {
        console.error("Erreur de géolocalisation:", error);
        setError("Impossible de récupérer votre position. Veuillez vérifier vos paramètres de localisation.");
        setIsGettingLocation(false);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-lg shadow-md">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Localisation *</label>
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

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Catégorie *</label>
        <Select 
          value={category} 
          onValueChange={setCategory} 
          disabled={isSubmitting}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez une catégorie" />
          </SelectTrigger>
          <SelectContent>
            {INCIDENT_CATEGORIES.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                <div className="flex items-center gap-2">
                  <cat.icon className={`h-4 w-4 ${cat.color}`} />
                  <span>{cat.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Description *</label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="h-32"
          placeholder="Décrivez le problème..."
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Photo</label>
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => document.getElementById("photo-input")?.click()}
            disabled={isSubmitting}
          >
            <Camera className="h-4 w-4" />
            <span>Ajouter une photo</span>
          </Button>
          <input
            id="photo-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            disabled={isSubmitting}
          />
          {image && (
            <span className="text-sm text-gray-600 truncate max-w-[200px]">
              {image.name}
            </span>
          )}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        <Send className={`h-4 w-4 mr-2 ${isSubmitting ? 'animate-spin' : ''}`} />
        {isSubmitting ? "Envoi en cours..." : "Envoyer le signalement"}
      </Button>
      
      <p className="text-sm text-gray-500 text-center">
        * Champs obligatoires
      </p>
    </form>
  );
}