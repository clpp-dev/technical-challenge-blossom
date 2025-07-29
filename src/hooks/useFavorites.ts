import { useState, useEffect } from 'react';

const FAVORITES_STORAGE_KEY = 'rickandmorty_favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (savedFavorites) {
      try {
        const favoriteIds = JSON.parse(savedFavorites) as string[];
        setFavorites(new Set(favoriteIds));
      } catch (error) {
        console.error('Error loading favorites from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  const isFavorite = (characterId: string): boolean => {
    return favorites.has(characterId);
  };

  const addFavorite = (characterId: string): void => {
    setFavorites(prev => new Set([...prev, characterId]));
  };

  const removeFavorite = (characterId: string): void => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      newFavorites.delete(characterId);
      return newFavorites;
    });
  };

  const toggleFavorite = (characterId: string): void => {
    if (isFavorite(characterId)) {
      removeFavorite(characterId);
    } else {
      addFavorite(characterId);
    }
  };

  const clearAllFavorites = (): void => {
    setFavorites(new Set());
  };

  const getFavoriteIds = (): string[] => {
    return Array.from(favorites);
  };

  return {
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    clearAllFavorites,
    getFavoriteIds,
    favoritesCount: favorites.size,
  };
};
