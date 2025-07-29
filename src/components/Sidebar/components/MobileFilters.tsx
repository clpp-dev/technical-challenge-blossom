import React from 'react';

interface MobileFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  pendingCharacterFilter: string;
  pendingSpeciesFilter: string;
  pendingStatusFilter: string;
  pendingGenderFilter: string;
  onCharacterFilterChange: (filter: string) => void;
  onSpeciesFilterChange: (species: string) => void;
  onStatusFilterChange: (status: string) => void;
  onGenderFilterChange: (gender: string) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
  loading: boolean;
  isActiveFilters: boolean;
}

const MobileFilters: React.FC<MobileFiltersProps> = ({
  isOpen,
  onClose,
  pendingCharacterFilter,
  pendingSpeciesFilter,
  pendingStatusFilter,
  pendingGenderFilter,
  onCharacterFilterChange,
  onSpeciesFilterChange,
  onStatusFilterChange,
  onGenderFilterChange,
  onApplyFilters,
  onClearFilters,
  loading,
  isActiveFilters
}) => {
  if (!isOpen) return null;

  return (
    <section className="fixed inset-0 bg-white z-50 lg:hidden">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center px-4 py-3">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors mr-3"
            aria-label="Go back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="none">
              <path d="M8 15L1 8M1 8L8 1M1 8L19 8" stroke="#8054C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-[#1F2937] flex-1 text-center mr-12">Filters</h1>
        </div>
      </header>

      <main className="p-6 pb-24">
        <article className="mb-6">
          <h3 className="text-base font-medium text-gray-900 mb-4">
            Characters
          </h3>
          <div className="flex gap-3 flex-wrap">
            {['All', 'Starred', 'Others'].map((filter) => (
              <button
                key={filter}
                onClick={() => onCharacterFilterChange(filter)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  pendingCharacterFilter === filter
                    ? 'bg-primary-100 text-primary-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </article>
        
        {/* Species Filter */}
        <article className="mb-6">
          <h3 className="text-base font-medium text-gray-900 mb-4">
            Specie
          </h3>
          <div className="flex gap-3">
            {['All', 'Human', 'Alien'].map((species) => (
              <button
                key={species}
                onClick={() => onSpeciesFilterChange(species)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  pendingSpeciesFilter === species
                    ? 'bg-primary-100 text-primary-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {species}
              </button>
            ))}
          </div>
        </article>

        {/* Status Filter */}
        <article className="mb-6">
          <h3 className="text-base font-medium text-gray-900 mb-4">
            Status
          </h3>
          <div className="flex gap-3 flex-wrap">
            {['All', 'Alive', 'Dead', 'Unknown'].map((status) => (
              <button
                key={status}
                onClick={() => onStatusFilterChange(status)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  pendingStatusFilter === status
                    ? 'bg-primary-100 text-primary-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </article>

        {/* Gender Filter */}
        <article className="mb-6">
          <h3 className="text-base font-medium text-gray-900 mb-4">
            Gender
          </h3>
          <div className="flex gap-3 flex-wrap">
            {['All', 'Male', 'Female', 'Genderless', 'Unknown'].map((gender) => (
              <button
                key={gender}
                onClick={() => onGenderFilterChange(gender)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  pendingGenderFilter === gender
                    ? 'bg-primary-100 text-primary-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {gender}
              </button>
            ))}
          </div>
        </article>
      </main>

      {/* Bottom Fixed Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex gap-3">
          <button
            className="flex-1 py-3 rounded-lg font-medium text-sm transition-colors"
            onClick={onApplyFilters}
            disabled={loading}
            style={{
              color: isActiveFilters ? '#FFFFFF' : '#6B7280',
              backgroundColor: isActiveFilters ? '#8054C7' : '#F3F4F6'
            }}
          >
            {loading ? 'Filtering...' : 'Filter'}
          </button>
          
          {(pendingCharacterFilter !== 'All' || pendingSpeciesFilter !== 'All' || pendingStatusFilter !== 'All' || pendingGenderFilter !== 'All') && (
            <button
              className="px-6 py-3 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg font-medium transition-colors text-sm"
              onClick={onClearFilters}
              disabled={loading}
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default MobileFilters;
