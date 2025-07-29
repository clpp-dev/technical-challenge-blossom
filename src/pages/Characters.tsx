import React, { useState, useMemo, useCallback } from 'react';
import { useGetCharacters } from '../hooks/useGraphQL';
import { useSearch } from '../context/SearchContext';
import Sidebar from '../components/Sidebar/Sidebar';
import CharacterList from '../components/CharacterList';
import CharacterDetailPanel from '../components/CharacterDetailPanel';
import type { CharacterFilter as FilterType, Character } from '../graphql/types';

const Characters: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterType>({});
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  
  // Usar el contexto global para el término de búsqueda
  const { searchTerm, setSearchTerm } = useSearch();

  // Combine search and filters
  const combinedFilters = useMemo(() => {
    return {
      ...filters,
      ...(searchTerm ? { name: searchTerm } : {}),
    };
  }, [filters, searchTerm]);

  const { data, error } = useGetCharacters(currentPage, combinedFilters);

  const characters = useMemo(() => {
    return data?.characters?.results || [];
  }, [data?.characters?.results]);

  const handleFilterChange = useCallback((newFilters: FilterType) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  const handleSearch = useCallback((search: string) => {
    setSearchTerm(search);
    setCurrentPage(1);
  }, [setSearchTerm]);

  const handleCharacterSelect = useCallback((character: Character) => {
    setSelectedCharacter(character);
  }, []);

  // Quitar el loader de pantalla completa - solo mostrar error si no hay data
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
      {/* Left Sidebar with Filters and Character List */}
      <div className="flex flex-col">
        <Sidebar 
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
        />
        <CharacterList 
          characters={characters}
          onCharacterSelect={handleCharacterSelect}
          selectedCharacterId={selectedCharacter?.id}
        />
      </div>

      {/* Right Panel - Character Detail */}
      <CharacterDetailPanel character={selectedCharacter} />
    </div>
  );
};

export default Characters;
