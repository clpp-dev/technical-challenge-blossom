import React, { useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import type { CharacterFilter as FilterType } from '../graphql/types';

interface SidebarProps {
  onFilterChange: (filters: FilterType) => void;
  onSearch: (searchTerm: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onFilterChange, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCharacterFilter, setActiveCharacterFilter] = useState('All');
  const [activeSpeciesFilter, setActiveSpeciesFilter] = useState('All');
  
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  React.useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  const handleCharacterFilterChange = (filter: string) => {
    setActiveCharacterFilter(filter);
    
    const filters: FilterType = {};
    if (filter === 'Starred') {
      // Handle starred characters separately
    } else if (filter === 'Others') {
      // Handle other characters
    }
    
    onFilterChange(filters);
  };

  const handleSpeciesFilterChange = (species: string) => {
    setActiveSpeciesFilter(species);
    
    const filters: FilterType = {};
    if (species !== 'All') {
      filters.species = species;
    }
    
    onFilterChange(filters);
  };

  return (
    <div className="w-80 bg-white h-screen p-6 shadow-lg flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Rick and Morty list</h1>
        
        {/* Search */}
        <div className="relative bg-red-500 ">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search or filter results"
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 2v-6.586a1 1 0 00-.293-.707L3.293 7.121A1 1 0 013 6.414V4z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Starred Characters Section */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
          STARRED CHARACTERS (2)
        </h3>
        <div className="space-y-2">
          <div className="flex items-center p-3 bg-purple-100 rounded-lg">
            <img 
              src="https://rickandmortyapi.com/api/character/avatar/343.jpeg" 
              alt="Abadango Cluster Princess"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div className="flex-1">
              <h4 className="font-medium text-gray-800">Abadango Cluster Princess</h4>
              <p className="text-sm text-gray-500">Alien</p>
            </div>
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </div>
          
          <div className="flex items-center p-3 bg-purple-100 rounded-lg">
            <img 
              src="https://rickandmortyapi.com/api/character/avatar/4.jpeg" 
              alt="Beth Smith"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div className="flex-1">
              <h4 className="font-medium text-gray-800">Beth Smith</h4>
              <p className="text-sm text-gray-500">Human</p>
            </div>
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* Character Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
          CHARACTERS ({4})
        </h3>
        <div className="flex space-x-2">
          {['All', 'Starred', 'Others'].map((filter) => (
            <button
              key={filter}
              onClick={() => handleCharacterFilterChange(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCharacterFilter === filter
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Species Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
          SPECIE
        </h3>
        <div className="flex space-x-2">
          {['All', 'Human', 'Alien'].map((species) => (
            <button
              key={species}
              onClick={() => handleSpeciesFilterChange(species)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeSpeciesFilter === species
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {species}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Button */}
      <button className="w-full bg-gray-200 text-gray-600 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors">
        Filter
      </button>
    </div>
  );
};

export default Sidebar;
