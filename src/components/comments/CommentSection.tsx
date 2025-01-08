import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle } from "lucide-react";

interface Comment {
  id: string;
  text: string;
  author: string;
  createdAt: Date;
}

interface CommentSectionProps {
  incidentId: number;
}

export function CommentSection({ incidentId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const { toast } = useToast();

  const handleAddComment = () => {
    if (!newComment.trim()) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Le commentaire ne peut pas être vide",
      });
      return;
    }

    const comment: Comment = {
      id: Date.now().toString(),
      text: newComment,
      author: "Utilisateur",
      createdAt: new Date(),
    };

    setComments([...comments, comment]);
    setNewComment("");
    
    toast({
      title: "Succès",
      description: "Commentaire ajouté avec succès",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MessageCircle className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Commentaires</h3>
      </div>
      
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <span className="font-medium">{comment.author}</span>
              <span className="text-sm text-gray-500">
                {comment.createdAt.toLocaleDateString()}
              </span>
            </div>
            <p className="mt-2 text-gray-700">{comment.text}</p>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Ajouter un commentaire..."
          className="min-h-[100px]"
        />
        <Button onClick={handleAddComment}>
          Ajouter un commentaire
        </Button>
      </div>
    </div>
  );
}