import React from 'react';
import { useFavorites } from '../hooks/useFavorites';
import { useComments } from '../hooks/useComments';
import CommentSection from './CommentSection';
import type { Character } from '../graphql/types';

interface CharacterDetailPanelProps {
  character: Character | null;
}

const CharacterDetailPanel: React.FC<CharacterDetailPanelProps> = ({ character }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { comments, addComment } = useComments(character?.id || '');

  if (!character) {
    return (
      <div className="flex-1 bg-gray-50 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <p className="text-lg font-medium">Select a character</p>
          <p className="text-sm">Choose a character from the list to see details</p>
        </div>
      </div>
    );
  }

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
    <div className="flex-1 bg-white overflow-y-auto">
      <div className="p-8">
        {/* Character Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center">
            <img 
              src={character.image} 
              alt={character.name}
              className="w-20 h-20 rounded-full mr-6 object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{character.name}</h1>
              <div className="flex items-center mb-1">
                <div className={`w-3 h-3 rounded-full mr-2 ${getStatusColor(character.status)}`} />
                <span className={`font-medium ${getStatusTextColor(character.status)}`}>
                  {character.status}
                </span>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => toggleFavorite(character.id)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg 
              className={`w-6 h-6 ${
                isFavorite(character.id) 
                  ? 'text-red-500 fill-current' 
                  : 'text-gray-400 hover:text-red-400'
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

        {/* Character Info Grid */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Specie</h3>
            <p className="text-lg text-gray-900">{character.species}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
            <p className={`text-lg font-medium ${getStatusTextColor(character.status)}`}>
              {character.status}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Occupation</h3>
            <p className="text-lg text-gray-900">
              {character.type || 'Unknown'}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Gender</h3>
            <p className="text-lg text-gray-900">{character.gender}</p>
          </div>

          <div className="col-span-2">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Origin</h3>
            <p className="text-lg text-gray-900">{character.origin.name}</p>
          </div>

          <div className="col-span-2">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Last Known Location</h3>
            <p className="text-lg text-gray-900">{character.location.name}</p>
          </div>
        </div>

        {/* Episodes */}
        {character.episode.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Episodes ({character.episode.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {character.episode.slice(0, 6).map((episode) => (
                <div key={episode.id} className="bg-gray-50 rounded-lg p-3">
                  <h4 className="font-medium text-gray-900 text-sm">{episode.name}</h4>
                  <p className="text-xs text-gray-500">{episode.episode}</p>
                </div>
              ))}
              {character.episode.length > 6 && (
                <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-center">
                  <p className="text-sm text-gray-500">
                    +{character.episode.length - 6} more episodes
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Comments Section */}
        <CommentSection 
          characterId={character.id} 
          comments={comments} 
          onAddComment={addComment}
        />
      </div>
    </div>
  );
};

export default CharacterDetailPanel;
