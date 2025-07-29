import React, { useState, useMemo, useCallback } from 'react';
import { useGetCharacters } from '../hooks/useGraphQL';
import Sidebar from '../components/Sidebar';
import CharacterList from '../components/CharacterList';
import CharacterDetailPanel from '../components/CharacterDetailPanel';
import LoadingSpinner from '../components/LoadingSpinner';
import type { CharacterFilter as FilterType, Character } from '../graphql/types';

const Characters: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterType>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  // Combine search and filters
  const combinedFilters = useMemo(() => {
    return {
      ...filters,
      ...(searchTerm ? { name: searchTerm } : {}),
    };
  }, [filters, searchTerm]);

  const { data, loading, error } = useGetCharacters(currentPage, combinedFilters);

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
  }, []);

  const handleCharacterSelect = useCallback((character: Character) => {
    setSelectedCharacter(character);
  }, []);

  if (loading && !data) return <LoadingSpinner />;

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
      
      {/* Loading overlay for pagination */}
      {loading && data && (
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
              <span className="text-gray-700">Loading...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Characters;
