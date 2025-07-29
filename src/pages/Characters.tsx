import React, { useState, useMemo, useCallback } from 'react';
import { useGetCharacters } from '../hooks/useGraphQL';
import { useSearch } from '../context/SearchContext';
import { useFavorites } from '../context/FavoritesContext';
import Sidebar from '../components/Sidebar/Sidebar';
import CharacterList from '../components/Sidebar/components/CharacterList';
import CharacterDetailPanel from '../components/CharacterDetailPanel';
import type { CharacterFilter as FilterType, Character } from '../graphql/types';

const Characters: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterType>({});
  const [characterFilter, setCharacterFilter] = useState<string>('All');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  
  const { searchTerm, setSearchTerm } = useSearch();
  const { favorites } = useFavorites();

  const combinedFilters = useMemo(() => {
    return {
      ...filters,
      ...(searchTerm ? { name: searchTerm } : {}),
    };
  }, [filters, searchTerm]);

  const { data, error } = useGetCharacters(currentPage, combinedFilters);

  const characters = useMemo(() => {
    const allCharacters = data?.characters?.results || [];
    const favoriteIds = new Set(favorites.map(fav => fav.id));

    switch (characterFilter) {
      case 'Starred':
        return favorites;
      case 'Others':
        return allCharacters.filter(character => !favoriteIds.has(character.id));
      default:
        return allCharacters.filter(character => !favoriteIds.has(character.id));
    }
  }, [data?.characters?.results, favorites, characterFilter]);

  const handleFilterChange = useCallback((newFilters: FilterType, newCharacterFilter?: string) => {
    setFilters(newFilters);
    if (newCharacterFilter !== undefined) {
      setCharacterFilter(newCharacterFilter);
    }
    setCurrentPage(1);
  }, []);

  const handleSearch = useCallback((search: string) => {
    setSearchTerm(search);
    setCurrentPage(1);
  }, [setSearchTerm]);

  const handleCharacterSelect = useCallback((character: Character) => {
    setSelectedCharacter(character);
  }, []);

  if (error && !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error loading characters</h2>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-gray-50">
      <div className="flex flex-col">
        <Sidebar 
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
          onCharacterSelect={handleCharacterSelect}
          selectedCharacterId={selectedCharacter?.id}
        />
        <CharacterList 
          characters={characters}
          onCharacterSelect={handleCharacterSelect}
          selectedCharacterId={selectedCharacter?.id}
        />
      </div>

      <CharacterDetailPanel character={selectedCharacter} />
    </div>
  );
};

export default Characters;
