import React, { useState } from 'react';
import type { CharacterFilter as FilterType } from '../../../graphql/types';

interface CharacterFilterProps {
  onFilterChange: (filters: FilterType) => void;
}

const CharacterFilter: React.FC<CharacterFilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterType>({});
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (key: keyof FilterType, value: string) => {
    const newFilters = {
      ...filters,
      [key]: value === '' ? undefined : value,
    };
    
    // Remove undefined values
    Object.keys(newFilters).forEach(k => {
      if (newFilters[k as keyof FilterType] === undefined) {
        delete newFilters[k as keyof FilterType];
      }
    });
    
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    onFilterChange({});
  };

  const hasActiveFilters = Object.keys(filters).length > 0;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold text-lg">Filters</h3>
        <div className="flex items-center gap-3">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-green-400 hover:text-green-300 underline transition-colors"
            >
              Clear all
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            {isExpanded ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Name Search */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Name
            </label>
            <input
              type="text"
              value={filters.name || ''}
              onChange={(e) => handleFilterChange('name', e.target.value)}
              placeholder="Search by name..."
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Status
            </label>
            <select
              value={filters.status || ''}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="alive">Alive</option>
              <option value="dead">Dead</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>

          {/* Species Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Species
            </label>
            <input
              type="text"
              value={filters.species || ''}
              onChange={(e) => handleFilterChange('species', e.target.value)}
              placeholder="e.g., Human, Alien..."
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Gender Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Gender
            </label>
            <select
              value={filters.gender || ''}
              onChange={(e) => handleFilterChange('gender', e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Genders</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="genderless">Genderless</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {Object.entries(filters).map(([key, value]) => (
            value && (
              <span
                key={key}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-sm rounded-full"
              >
                <span className="capitalize font-medium">{key}:</span>
                <span>{value}</span>
                <button
                  onClick={() => handleFilterChange(key as keyof FilterType, '')}
                  className="ml-1 hover:text-red-300 transition-colors"
                >
                  ×
                </button>
              </span>
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default CharacterFilter;
