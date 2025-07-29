import React from 'react';
import { useFavorites } from '../../../context/FavoritesContext';
import type { Character } from '../../../graphql/types';

interface CharacterListProps {
  characters: Character[];
  onCharacterSelect: (character: Character) => void;
  selectedCharacterId?: string;
}

const CharacterList: React.FC<CharacterListProps> = ({ 
  characters, 
  onCharacterSelect, 
  selectedCharacterId 
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleFavoriteClick = (e: React.MouseEvent, character: Character) => {
    e.stopPropagation();
    toggleFavorite(character);
  };

  return (
    <div className="w-full bg-white border-t border-gray-200 h-full overflow-y-auto">
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
          CHARACTERS ({characters.length})
        </h3>
        
        <div className="space-y-2">
          {characters.map((character) => (
            <div
              key={character.id}
              onClick={() => onCharacterSelect(character)}
              className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors border-b mb-2 border-gray-200 ${
                selectedCharacterId === character.id
                  ? 'bg-purple-100 border border-purple-200'
                  : 'hover:bg-gray-50'
              }`}
            >
              <img 
                src={character.image} 
                alt={character.name}
                className="w-8 h-8 rounded-full mr-3 object-cover"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-800 truncate">{character.name}</h4>
                <p className="text-sm text-gray-500">{character.species}</p>
              </div>
              <button
                onClick={(e) => handleFavoriteClick(e, character)}
                className="ml-2 p-1 hover:bg-white rounded-full transition-colors"
              >
                <svg 
                  className={`w-5 h-5 ${
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharacterList;
