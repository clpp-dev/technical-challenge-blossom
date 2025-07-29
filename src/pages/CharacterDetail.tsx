import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetCharacter } from '../hooks/useGraphQL';
import { useFavorites } from '../hooks/useFavorites';
import LoadingSpinner from '../components/LoadingSpinner';

const CharacterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useGetCharacter(id!);
  const { isFavorite, toggleFavorite } = useFavorites();

  if (loading) return <LoadingSpinner />;

  if (error || !data?.character) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Character not found</h2>
          <p className="text-gray-300 mb-6">
            {error?.message || 'The character you are looking for does not exist.'}
          </p>
          <Link
            to="/characters"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Back to Characters
          </Link>
        </div>
      </div>
    );
  }

  const character = data.character;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'text-green-400';
      case 'dead':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          to="/characters"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 transition-colors duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Characters
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Character Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md">
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-auto object-cover"
              />
              
              {/* Favorite Button */}
              <button
                onClick={() => toggleFavorite(character.id)}
                className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-3 hover:bg-black/70 transition-colors duration-200"
              >
                <svg
                  className={`w-6 h-6 ${
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
            </div>
          </div>

          {/* Character Information */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-rick">
                {character.name}
              </h1>
              
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-4 h-4 rounded-full ${
                  character.status.toLowerCase() === 'alive' ? 'bg-green-500' :
                  character.status.toLowerCase() === 'dead' ? 'bg-red-500' : 'bg-gray-500'
                }`} />
                <span className={`font-medium text-lg ${getStatusColor(character.status)}`}>
                  {character.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
                <h3 className="text-blue-300 font-semibold mb-2">Species</h3>
                <p className="text-white text-lg">{character.species}</p>
              </div>

              {character.type && (
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
                  <h3 className="text-blue-300 font-semibold mb-2">Type</h3>
                  <p className="text-white text-lg">{character.type}</p>
                </div>
              )}

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
                <h3 className="text-blue-300 font-semibold mb-2">Gender</h3>
                <p className="text-white text-lg">{character.gender}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
                <h3 className="text-blue-300 font-semibold mb-2">Origin</h3>
                <p className="text-white text-lg">{character.origin.name}</p>
                {character.origin.dimension && (
                  <p className="text-gray-300 text-sm">Dimension: {character.origin.dimension}</p>
                )}
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:col-span-2">
                <h3 className="text-blue-300 font-semibold mb-2">Last Known Location</h3>
                <p className="text-white text-lg">{character.location.name}</p>
                {character.location.dimension && (
                  <p className="text-gray-300 text-sm">Dimension: {character.location.dimension}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Episodes */}
        {character.episode.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Episodes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {character.episode.map((episode) => (
                <div key={episode.id} className="bg-white/10 backdrop-blur-md rounded-xl p-4">
                  <h3 className="text-white font-semibold mb-1">{episode.name}</h3>
                  <p className="text-blue-300 text-sm mb-1">{episode.episode}</p>
                  {episode.air_date && (
                    <p className="text-gray-300 text-sm">Air Date: {episode.air_date}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterDetail;
