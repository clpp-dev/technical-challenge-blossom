import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_CHARACTER_BY_ID } from '../graphql/queries';
import { useFavorites } from '../context/FavoritesContext';
import LoadingSpinner from '../components/LoadingSpinner';
import type { Character } from '../graphql/types';

interface CharacterDetailData {
  character: Character;
}

interface CharacterDetailVars {
  id: string;
}

const CharacterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const { loading, error, data } = useQuery<CharacterDetailData, CharacterDetailVars>(
    GET_CHARACTER_BY_ID,
    {
      variables: { id: id! },
      skip: !id,
    }
  );

  const handleGoBack = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !data?.character) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p className="text-lg font-medium">Character not found</p>
          <button 
            onClick={handleGoBack}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const character = data.character;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'bg-green-500';
      case 'dead':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'text-green-600';
      case 'dead':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white sticky top-0 z-10">
        <div className="flex items-center px-4 py-3">
          <button
            onClick={handleGoBack}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors mr-3"
            aria-label="Go back"
          >
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="none">
              <path d="M8 15L1 8M1 8L8 1M1 8L19 8" stroke="#8054C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
           </svg>
          </button>
          {/* <h1 className="text-lg font-semibold text-gray-900">Character Details</h1> */}
        </div>
      </header>

      {/* Character Content */}
      <main className="p-6">
        {/* Character Header */}
        <div className="flex items-start mb-6">
          <div className="relative">
            <img 
              src={character.image} 
              alt={character.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <button
              onClick={() => toggleFavorite(character)}
              className="absolute -bottom-1 -right-1 p-1 rounded-full bg-white transition-colors"
            >
              <svg 
                className={`w-6 h-6 ${
                  isFavorite(character.id) 
                    ? 'text-green-500 fill-current' 
                    : 'text-gray-400 hover:text-green-400'
                }`}
                fill={isFavorite(character.id) ? 'currentColor' : 'none'}
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>
          <div className="ml-4 flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{character.name}</h2>
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${getStatusColor(character.status)}`} />
              <span className={`font-medium ${getStatusTextColor(character.status)}`}>
                {character.status}
              </span>
            </div>
          </div>
        </div>

        {/* Character Details Grid */}
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Specie</h3>
            <p className="text-lg text-gray-900">{character.species}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
            <p className={`text-lg font-medium ${getStatusTextColor(character.status)}`}>
              {character.status}
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Occupation</h3>
            <p className="text-lg text-gray-900">
              {character.type || 'Unknown'}
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Gender</h3>
            <p className="text-lg text-gray-900">{character.gender}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Origin</h3>
            <p className="text-lg text-gray-900">{character.origin.name}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Last Known Location</h3>
            <p className="text-lg text-gray-900">{character.location.name}</p>
          </div>
        </div>

        {/* Episodes Section */}
        {character.episode.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Episodes ({character.episode.length})
            </h3>
            <div className="space-y-3">
              {character.episode.slice(0, 6).map((episode) => (
                <div key={episode.id} className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 text-sm">{episode.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{episode.episode}</p>
                </div>
              ))}
              {character.episode.length > 6 && (
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500">
                    +{character.episode.length - 6} more episodes
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CharacterDetail;
