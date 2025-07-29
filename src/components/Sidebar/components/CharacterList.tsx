import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../../../hooks/useFavorites';
import type { Character } from '../../../graphql/types';

type SortOrder = 'asc' | 'desc';

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
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [hiddenCharacters, setHiddenCharacters] = useState<Set<string>>(new Set());

  const sortedCharacters = useMemo(() => {
    return [...characters]
      .filter(character => !hiddenCharacters.has(character.id))
      .sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
  }, [characters, sortOrder, hiddenCharacters]);

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const handleCharacterClick = (character: Character) => {
    if (window.innerWidth < 1024) {
      navigate(`/character/${character.id}`);
    } else {
      onCharacterSelect(character);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent, character: Character) => {
    e.stopPropagation();
    toggleFavorite(character);
  };

  const handleRemoveCharacter = (e: React.MouseEvent, characterId: string) => {
    e.stopPropagation();
    setHiddenCharacters(prev => new Set(prev).add(characterId));
  };

  return (
    <section className="w-full bg-white border-t border-gray-200 h-full overflow-y-auto">
      <article className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            CHARACTERS ({sortedCharacters.length})
          </h3>
          <button
            onClick={toggleSortOrder}
            className="w-8 h-8 flex justify-center items-center p-1 cursor-pointer hover:bg-primary-100 rounded-[8px] transition-colors duration-200"
            title={`Sort ${sortOrder === 'asc' ? ' Z-A' : ' A-Z'}`}
          >
            <svg 
              className="text-primary-600 w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {sortOrder === 'asc' ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" 
                />
              )}
            </svg>
          </button>
        </div>
        
        <div className="space-y-2">
          {sortedCharacters.map((character) => (
            <div
              key={character.id}
              onClick={() => handleCharacterClick(character)}
              className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
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
              <div className="flex items-center gap-1 ml-2">
                <button
                  onClick={(e) => handleRemoveCharacter(e, character.id)}
                  className="p-1 hover:bg-white rounded-full transition-colors group"
                  title="Remove character from list"
                >
                  <svg 
                    className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
                <button
                  onClick={(e) => handleFavoriteClick(e, character)}
                  className="p-1 hover:bg-white rounded-full transition-colors"
                  title={isFavorite(character.id) ? "Remove from favorites" : "Add to favorites"}
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
            </div>
          ))}
        </div>
      </article>
    </section>
  );
};

export default CharacterList;
