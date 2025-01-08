import { useState, useCallback, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";

export const useFavorites = <T extends { id: number }>(key: string) => {
  const [favorites, setFavorites] = useState<T[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    }
  }, [key]);

  const toggleFavorite = useCallback((item: T) => {
    setFavorites((prev) => {
      const isAlreadyFavorite = prev.some((fav) => fav.id === item.id);
      const newFavorites = isAlreadyFavorite
        ? prev.filter((fav) => fav.id !== item.id)
        : [...prev, item];
      
      localStorage.setItem(key, JSON.stringify(newFavorites));
      
      toast({
        title: isAlreadyFavorite ? "Retiré des favoris" : "Ajouté aux favoris",
        description: `L'incident a été ${isAlreadyFavorite ? 'retiré des' : 'ajouté aux'} favoris.`,
      });
      
      return newFavorites;
    });
  }, [key, toast]);

  const isFavorite = useCallback((id: number) => {
    return favorites.some((fav) => fav.id === id);
  }, [favorites]);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
};