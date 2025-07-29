import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../../hooks/useFavorites';
import type { Character } from '../../../graphql/types';

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const { isFavorite, toggleFavorite } = useFavorites();

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

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(character);
  };

  return (
    <Link to={`/character/${character.id}`}>
      <div className="group relative bg-white/10 backdrop-blur-md rounded-xl overflow-hidden hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 z-10 bg-black/50 backdrop-blur-sm rounded-full p-2 hover:bg-black/70 transition-colors duration-200"
        >
          <svg
            className={`w-5 h-5 ${
              isFavorite(character.id) 
                ? 'text-green-500 fill-current' 
                : 'text-white hover:text-green-400'
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

        <div className="relative overflow-hidden">
          <img
            src={character.image}
            alt={character.name}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
          
          <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(character.status)}`} />
            <span className="text-white text-sm font-medium capitalize">
              {character.status}
            </span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-white font-bold text-lg mb-2 group-hover:text-blue-300 transition-colors duration-200 line-clamp-1">
            {character.name}
          </h3>
          
          <div className="space-y-1 text-sm">
            <p className="text-gray-300">
              <span className="font-medium">Species:</span> {character.species}
            </p>
            {character.type && (
              <p className="text-gray-300">
                <span className="font-medium">Type:</span> {character.type}
              </p>
            )}
            <p className="text-gray-300">
              <span className="font-medium">Gender:</span> {character.gender}
            </p>
            <p className="text-gray-300">
              <span className="font-medium">Origin:</span> {character.origin.name}
            </p>
          </div>

          <div className="mt-3 pt-3 border-t border-white/20">
            <p className="text-blue-300 text-sm font-medium">
              {character.episode.length} episode{character.episode.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CharacterCard;
