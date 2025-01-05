import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HelpCircle, MapPin, ThumbsUp, MessageCircle, Share2 } from "lucide-react";

export default function UserGuide() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Guide d'utilisation de SignalCity</DialogTitle>
          <DialogDescription>
            Découvrez comment utiliser l'application pour signaler et suivre les incidents dans votre ville.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <section className="space-y-3">
            <h3 className="text-lg font-semibold">Signaler un incident</h3>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                1. Cliquez sur le bouton "Signaler un incident" dans le header
              </p>
              <p className="text-sm text-muted-foreground">
                2. Sélectionnez la localisation sur la carte ou utilisez votre position actuelle
              </p>
              <p className="text-sm text-muted-foreground">
                3. Choisissez la catégorie appropriée
              </p>
              <p className="text-sm text-muted-foreground">
                4. Ajoutez une description et optionnellement une photo
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-semibold">Consulter les signalements</h3>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                • Utilisez la carte interactive pour voir tous les incidents
              </p>
              <p className="text-sm text-muted-foreground">
                • Filtrez par catégorie en utilisant les boutons de filtre
              </p>
              <p className="text-sm text-muted-foreground">
                • Utilisez la barre de recherche pour trouver des signalements spécifiques
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-semibold">Interagir avec les signalements</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <ThumbsUp className="h-4 w-4 text-primary" />
                <span className="text-sm">Soutenir</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-primary" />
                <span className="text-sm">Commenter</span>
              </div>
              <div className="flex items-center gap-2">
                <Share2 className="h-4 w-4 text-primary" />
                <span className="text-sm">Partager</span>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-semibold">Statistiques et suivi</h3>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                • Consultez les statistiques globales en haut de la page
              </p>
              <p className="text-sm text-muted-foreground">
                • Suivez l'évolution des signalements dans le temps
              </p>
              <p className="text-sm text-muted-foreground">
                • Visualisez la répartition par catégorie
              </p>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}