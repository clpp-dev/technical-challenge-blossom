import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Character } from '../graphql/types';

interface FavoritesContextType {
  favorites: Character[];
  addFavorite: (character: Character) => void;
  removeFavorite: (characterId: string) => void;
  isFavorite: (characterId: string) => boolean;
  toggleFavorite: (character: Character) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Export the context so it can be used by the hook
export { FavoritesContext };

interface FavoritesProviderProps {
  children: ReactNode;
}

const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<Character[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('rickAndMortyFavorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error loading favorites from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('rickAndMortyFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (character: Character) => {
    setFavorites(prev => {
      if (prev.some(fav => fav.id === character.id)) {
        return prev;
      }
      return [...prev, character];
    });
  };

  const removeFavorite = (characterId: string) => {
    setFavorites(prev => prev.filter(fav => fav.id !== characterId));
  };

  const isFavorite = (characterId: string) => {
    return favorites.some(fav => fav.id === characterId);
  };

  const toggleFavorite = (character: Character) => {
    if (isFavorite(character.id)) {
      removeFavorite(character.id);
    } else {
      addFavorite(character);
    }
  };

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;
