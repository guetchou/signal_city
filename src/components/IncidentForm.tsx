import { Camera, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import LocationSection from "./incident-form/LocationSection";
import CategorySection from "./incident-form/CategorySection";
import DescriptionSection from "./incident-form/DescriptionSection";
import CallbackSection from "./incident-form/CallbackSection";

export default function IncidentForm() {
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      if (!location || !category || !description) {
        setError("Veuillez remplir tous les champs obligatoires");
        return;
      }

      if (phone && !/^[0-9+\s-]{10,}$/.test(phone)) {
        setError("Veuillez entrer un numéro de téléphone valide");
        return;
      }

      setIsSubmitting(true);
      console.log("Soumission du formulaire:", { 
        location, 
        category, 
        description, 
        image,
        phone
      });
      
      // Simuler un délai réseau
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Signalement envoyé",
        description: phone 
          ? "Votre signalement a été enregistré. Nous vous rappellerons bientôt."
          : "Votre signalement a été enregistré avec succès",
      });
      
      // Réinitialisation du formulaire
      setLocation("");
      setCategory("");
      setDescription("");
      setImage(null);
      setPhone("");
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
      <LocationSection
        location={location}
        setLocation={setLocation}
        isGettingLocation={isGettingLocation}
        handleLocation={handleLocation}
        error={error}
      />

      <CategorySection
        category={category}
        setCategory={setCategory}
        isSubmitting={isSubmitting}
      />

      <DescriptionSection
        description={description}
        setDescription={setDescription}
        isSubmitting={isSubmitting}
      />

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

      <CallbackSection
        phone={phone}
        setPhone={setPhone}
        isSubmitting={isSubmitting}
      />

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        <Send className={`h-4 w-4 mr-2 ${isSubmitting ? 'animate-spin' : ''}`} />
        {isSubmitting ? "Envoi en cours..." : "Envoyer le signalement"}
      </Button>
      
      <p className="text-sm text-gray-500 text-center">
        <span className="text-red-500">*</span> Champs obligatoires
      </p>
    </form>
  );
}