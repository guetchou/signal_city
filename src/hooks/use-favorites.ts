import { useLocalStorage } from "./use-local-storage";

export function useFavorites<T extends { id: number | string }>(key: string) {
  const [favorites, setFavorites] = useLocalStorage<T[]>(key, []);

  const toggleFavorite = (item: T) => {
    setFavorites(current => {
      const exists = current.some(f => f.id === item.id);
      if (exists) {
        return current.filter(f => f.id !== item.id);
      }
      return [...current, item];
    });
  };

  const isFavorite = (id: T['id']) => {
    return favorites.some(f => f.id === id);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite
  };
}