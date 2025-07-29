import React, { useState, useMemo } from 'react';
import { useGetCharacters } from '../hooks/useGraphQL';
import CharacterCard from '../components/CharacterCard';
import CharacterFilter from '../components/CharacterFilter';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import type { CharacterFilter as FilterType } from '../graphql/types';

const Characters: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterType>({});
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const { data, loading, error } = useGetCharacters(currentPage, filters);

  // Sort characters by name
  const sortedCharacters = useMemo(() => {
    if (!data?.characters?.results) return [];
    
    const sorted = [...data.characters.results].sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      
      if (sortOrder === 'asc') {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
    
    return sorted;
  }, [data?.characters?.results, sortOrder]);

  const handleFilterChange = (newFilters: FilterType) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  if (loading) return <LoadingSpinner />;
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Error loading characters</h2>
          <p className="text-gray-300">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-rick">
            Rick and Morty
          </h1>
          <p className="text-xl text-gray-300">
            Explore the multiverse and discover all characters
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6">
            <CharacterFilter onFilterChange={handleFilterChange} />
            
            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={toggleSortOrder}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
              >
                Sort by Name 
                {sortOrder === 'asc' ? '(A-Z)' : '(Z-A)'}
                <svg 
                  className={`w-4 h-4 transition-transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
              
              {data?.characters?.info && (
                <div className="text-white text-sm">
                  Showing {sortedCharacters.length} of {data.characters.info.count} characters
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Characters Grid */}
        {sortedCharacters.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
              {sortedCharacters.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>

            {/* Pagination */}
            {data?.characters?.info && (
              <Pagination
                currentPage={currentPage}
                totalPages={data.characters.info.pages}
                onPageChange={setCurrentPage}
                hasNext={!!data.characters.info.next}
                hasPrev={!!data.characters.info.prev}
              />
            )}
          </>
        ) : (
          <div className="text-center text-white py-12">
            <h3 className="text-2xl font-bold mb-4">No characters found</h3>
            <p className="text-gray-300">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Characters;
