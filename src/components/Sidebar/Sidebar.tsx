
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';
import { useSearch } from '../../context/SearchContext';
import { useFavorites } from '../../hooks/useFavorites';
import MobileFilters from './components/MobileFilters';
import type { CharacterFilter as FilterType, Character } from '../../graphql/types';

interface SidebarProps {
  onFilterChange: (filters: FilterType, characterFilter?: string) => void;
  onSearch: (searchTerm: string) => void;
  onCharacterSelect?: (character: Character) => void;
  selectedCharacterId?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onFilterChange, onSearch, onCharacterSelect, selectedCharacterId }) => {
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm } = useSearch();
  const { favorites, toggleFavorite } = useFavorites();
  
  const [showFilters, setShowFilters] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pendingCharacterFilter, setPendingCharacterFilter] = useState('All');
  const [pendingSpeciesFilter, setPendingSpeciesFilter] = useState('All');
  const [pendingStatusFilter, setPendingStatusFilter] = useState('All');
  const [pendingGenderFilter, setPendingGenderFilter] = useState('All');

  const [isActiveFilters, setIsActiveFilters] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  React.useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  // Sincronizar isActiveFilters cuando cambien los filtros
  React.useEffect(() => {
    if (pendingCharacterFilter !== 'All' || pendingSpeciesFilter !== 'All' || pendingStatusFilter !== 'All' || pendingGenderFilter !== 'All') {
      setIsActiveFilters(true);
    } else {
      setIsActiveFilters(false);
    }
  }, [pendingCharacterFilter, pendingSpeciesFilter, pendingStatusFilter, pendingGenderFilter]);

  const handleToggleFilters = () => {
    // En mobile (ancho menor a lg), abrir filtros en fullscreen
    if (window.innerWidth < 1024) {
      setShowMobileFilters(true);
    } else {
      // En desktop, mostrar dropdown como antes
      setShowFilters(!showFilters);
    }
  };

  const handlePendingCharacterFilterChange = (filter: string) => {
    setPendingCharacterFilter(filter);
    handleViewFilterChange(filter, pendingSpeciesFilter, pendingStatusFilter, pendingGenderFilter);
  };

  const handlePendingSpeciesFilterChange = (species: string) => {
    setPendingSpeciesFilter(species);
    handleViewFilterChange(pendingCharacterFilter, species, pendingStatusFilter, pendingGenderFilter);
  };

  const handlePendingStatusFilterChange = (status: string) => {
    setPendingStatusFilter(status);
    handleViewFilterChange(pendingCharacterFilter, pendingSpeciesFilter, status, pendingGenderFilter);
  };

  const handlePendingGenderFilterChange = (gender: string) => {
    setPendingGenderFilter(gender);
    handleViewFilterChange(pendingCharacterFilter, pendingSpeciesFilter, pendingStatusFilter, gender);
  };

  const handleViewFilterChange = (
    characterFilter = pendingCharacterFilter,
    speciesFilter = pendingSpeciesFilter,
    statusFilter = pendingStatusFilter,
    genderFilter = pendingGenderFilter
  ) => {
    if (characterFilter !== 'All' || speciesFilter !== 'All' || statusFilter !== 'All' || genderFilter !== 'All') {
      setIsActiveFilters(true);
    } else {
      setIsActiveFilters(false);
    }
  }


  const handleApplyFilters = async () => {
    setLoading(true);
    setSearchTerm('');
    const filters: FilterType = {};
    
    if (pendingSpeciesFilter !== 'All') {
      filters.species = pendingSpeciesFilter;
    }
    
    if (pendingStatusFilter !== 'All') {
      filters.status = pendingStatusFilter.toLowerCase() as 'alive' | 'dead' | 'unknown';
    }
    
    if (pendingGenderFilter !== 'All') {
      filters.gender = pendingGenderFilter.toLowerCase() as 'female' | 'male' | 'genderless' | 'unknown';
    }
    
    console.log('Applying filters:', filters, 'Character filter:', pendingCharacterFilter);
    await onFilterChange(filters, pendingCharacterFilter);
    setLoading(false);
    setShowFilters(false);
    setShowMobileFilters(false);
  };

  const handleClearFilters = async () => {
    setLoading(true);
    setPendingCharacterFilter('All');
    setPendingSpeciesFilter('All');
    setPendingStatusFilter('All');
    setPendingGenderFilter('All');
    setSearchTerm('');
    await onFilterChange({}, 'All');
    setLoading(false);
    setShowFilters(false);
    setShowMobileFilters(false);
    setIsActiveFilters(false);
  };

  const handleCloseMobileFilters = () => {
    setShowMobileFilters(false);
  };

  const handleFavoriteClick = (e: React.MouseEvent, character: Character) => {
    e.stopPropagation();
    toggleFavorite(character);
  };

  const handleFavoriteCharacterSelect = (character: Character) => {
    // En mobile (ancho menor a lg), navegar a la ruta dinámica
    if (window.innerWidth < 1024) {
      navigate(`/character/${character.id}`);
    } else {
      // En desktop, usar el callback para mostrar en el panel
      if (onCharacterSelect) {
        onCharacterSelect(character);
      }
    }
  };


  return (
    <section className="relative w-full min-w-96 max-w-[605px] lg:min-h-[380px] max-h-[400px] lg:max-h-none bg-white  p-6 shadow-lg flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Rick and Morty list</h1>
        {/* Search */}
        <article className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchTerm}
            onClick={() => setShowFilters(false)}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search or filter results"
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 right-2 p-1 w-8 h-8 top-[50%] translate-y-[-50%] 
            flex items-center justify-center cursor-pointer hover:bg-primary-100 rounded-[8px] transition-colors duration-200"
            style={{ 
              backgroundColor: showFilters ? '#EEE3FF' : '',
            }}
            onClick={handleToggleFilters}
          >
            <button
              type="button"
              aria-label="Open filters"
              className="focus:outline-none"
            >
              {loading ? (
                <svg className="animate-spin w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
              ) : (
               <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 3V1M9 3C7.89543 3 7 3.89543 7 5C7 6.10457 7.89543 7 9 7M9 3C10.1046 3 11 3.89543 11 5C11 6.10457 10.1046 7 9 7M3 15C4.10457 15 5 14.1046 5 13C5 11.8954 4.10457 11 3 11M3 15C1.89543 15 1 14.1046 1 13C1 11.8954 1.89543 11 3 11M3 15V17M3 11V1M9 7V17M15 15C16.1046 15 17 14.1046 17 13C17 11.8954 16.1046 11 15 11M15 15C13.8954 15 13 14.1046 13 13C13 11.8954 13.8954 11 15 11M15 15V17M15 11V1" stroke="#8054C7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              )}
            </button>
          </div>
        </article>

        {showFilters && (
          <article className="absolute top-[125px] mx-5 left-0 w-[90%] mb-6 p-4 bg-gray-50 rounded-lg border border-b-2 z-10 ">
            {/* Active Filters Display */}
            {(pendingCharacterFilter !== 'All' || pendingSpeciesFilter !== 'All' || pendingStatusFilter !== 'All' || pendingGenderFilter !== 'All') && (
              <div className="mb-4 p-2 bg-primary-600 rounded-md border border-blue-200 hidden">
                <h4 className="text-xs font-medium text-white mb-1">Active Filters:</h4>
                <div className="flex flex-wrap gap-1">
                  {pendingCharacterFilter !== 'All' && (
                    <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded">
                      Character: {pendingCharacterFilter}
                    </span>
                  )}
                  {pendingSpeciesFilter !== 'All' && (
                    <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded">
                      Species: {pendingSpeciesFilter}
                    </span>
                  )}
                  {pendingStatusFilter !== 'All' && (
                    <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded">
                      Status: {pendingStatusFilter}
                    </span>
                  )}
                  {pendingGenderFilter !== 'All' && (
                    <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded">
                      Gender: {pendingGenderFilter}
                    </span>
                  )}
                </div>
              </div>
            )}
            
            {/* Character Filter */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500 tracking-wide mb-3">
                Character
              </h3>
              <div className="flex space-x-2 flex-wrap">
                {['All', 'Starred', 'Others'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => handlePendingCharacterFilterChange(filter)}
                    className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
                      pendingCharacterFilter === filter
                       ? 'bg-primary-100 text-primary-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Species Filter */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500 tracking-wide mb-3">
                Specie
              </h3>
              <div className="flex space-x-2">
                {['All', 'Human', 'Alien'].map((species) => (
                  <button
                    key={species}
                    onClick={() => handlePendingSpeciesFilterChange(species)}
                    className={`px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                      pendingSpeciesFilter === species
                        ? 'bg-primary-100 text-primary-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {species}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500 tracking-wide mb-3">
                Status
              </h3>
              <div className="flex space-x-2">
                {['All', 'Alive', 'Dead', 'Unknown'].map((status) => (
                  <button
                    key={status}
                    onClick={() => handlePendingStatusFilterChange(status)}
                    className={`px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                      pendingStatusFilter === status
                        ? 'bg-primary-100 text-primary-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Gender Filter */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500 tracking-wide mb-3">
                Gender
              </h3>
              <div className="flex gap-2 flex-wrap">
                {['All', 'Male', 'Female', 'Genderless', 'Unknown'].map((gender) => (
                  <button
                    key={gender}
                    onClick={() => handlePendingGenderFilterChange(gender)}
                    className={`px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                      pendingGenderFilter === gender
                        ? 'bg-primary-100 text-primary-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {gender}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Filter Buttons */}
            <div className="flex gap-2">
              <button
                className="flex-1 bg-gray-200 text-gray-500 hover:text-white py-2 rounded-lg font-medium 
                hover:bg-primary-600 transition-colors flex items-center justify-center text-sm"
                onClick={handleApplyFilters}
                disabled={loading}
                style={{
                  color: isActiveFilters ? '#FFFFFF' : '',
                  backgroundColor: isActiveFilters ? '#8054C7' : ''
                }}
              >
                {loading ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 3V1M9 3C7.89543 3 7 3.89543 7 5C7 6.10457 7.89543 7 9 7M9 3C10.1046 3 11 3.89543 11 5C11 6.10457 10.1046 7 9 7M3 15C4.10457 15 5 14.1046 5 13C5 11.8954 4.10457 11 3 11M3 15C1.89543 15 1 14.1046 1 13C1 11.8954 1.89543 11 3 11M3 15V17M3 11V1M9 7V17M15 15C16.1046 15 17 14.1046 17 13C17 11.8954 16.1046 11 15 11M15 15C13.8954 15 13 14.1046 13 13C13 11.8954 13.8954 11 15 11M15 15V17M15 11V1" stroke="#8054C7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Filtering...
                  </>
                ) : (
                  'Filter'
                )}
              </button>
              
              {(pendingCharacterFilter !== 'All' || pendingSpeciesFilter !== 'All' || pendingStatusFilter !== 'All' || pendingGenderFilter !== 'All') && (
                <button
                  className="px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg font-medium transition-colors text-sm"
                  onClick={handleClearFilters}
                  disabled={loading}
                >
                  Clear
                </button>
              )}
            </div>
          </article>
        )}
      </div>


      <article className="mb-6 overflow-hidden max-h-[380px]">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
          STARRED CHARACTERS ({favorites.length})
        </h3>
        <article className="space-y-2 overflow-y-auto max-h-[100%] pb-10">
          {favorites.length === 0 ? (
            <div className="text-center py-4 text-gray-400 text-sm">
              No starred characters yet
            </div>
          ) : (
            favorites.map((character) => (
              <div 
                key={character.id} 
                onClick={() => handleFavoriteCharacterSelect(character)}
                className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedCharacterId === character.id
                    ? 'bg-purple-200 border border-purple-300'
                    : 'bg-purple-100 hover:bg-purple-200'
                }`}
              >
                <img 
                  src={character.image} 
                  alt={character.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{character.name}</h4>
                  <p className="text-sm text-gray-500">{character.species}</p>
                </div>
                <button
                  onClick={(e) => handleFavoriteClick(e, character)}
                  className="ml-2 p-1 hover:bg-white rounded-full transition-colors"
                  aria-label="Remove from favorites"
                >
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </article>
      </article>

      {/* Mobile Filters Component */}
      <MobileFilters
        isOpen={showMobileFilters}
        onClose={handleCloseMobileFilters}
        pendingCharacterFilter={pendingCharacterFilter}
        pendingSpeciesFilter={pendingSpeciesFilter}
        pendingStatusFilter={pendingStatusFilter}
        pendingGenderFilter={pendingGenderFilter}
        onCharacterFilterChange={handlePendingCharacterFilterChange}
        onSpeciesFilterChange={handlePendingSpeciesFilterChange}
        onStatusFilterChange={handlePendingStatusFilterChange}
        onGenderFilterChange={handlePendingGenderFilterChange}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
        loading={loading}
        isActiveFilters={isActiveFilters}
      />
    </section>
  );
};

export default Sidebar;
