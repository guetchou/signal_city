import { Button } from "@/components/ui/button";
import { ThumbsUp, MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface SocialActionsProps {
  incidentId: number;
}

export default function SocialActions({ incidentId }: SocialActionsProps) {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
      toast.success("Merci pour votre soutien !");
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: "SignalCity - Signalement",
        text: "Voir ce signalement sur SignalCity",
        url: `${window.location.origin}/incident/${incidentId}`,
      });
    } catch (error) {
      console.error("Erreur lors du partage:", error);
      toast.error("Le partage n'est pas disponible sur votre appareil");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        className={`gap-2 ${hasLiked ? "text-primary" : ""}`}
        onClick={handleLike}
      >
        <ThumbsUp className="h-4 w-4" />
        <span>{likes}</span>
      </Button>
      <Button variant="ghost" size="sm" className="gap-2">
        <MessageCircle className="h-4 w-4" />
        <span>Commenter</span>
      </Button>
      <Button variant="ghost" size="sm" className="gap-2" onClick={handleShare}>
        <Share2 className="h-4 w-4" />
        <span>Partager</span>
      </Button>
    </div>
  );
}