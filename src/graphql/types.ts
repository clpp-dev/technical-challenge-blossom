// Rick and Morty API Types
export interface Character {
  id: string;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: {
    id: string;
    name: string;
    dimension: string;
  };
  location: {
    id: string;
    name: string;
    dimension: string;
  };
  image: string;
  episode: Episode[];
  created: string;
}

export interface Episode {
  id: string;
  name: string;
  air_date: string;
  episode: string;
  characters: Character[];
  created: string;
}

export interface Location {
  id: string;
  name: string;
  type: string;
  dimension: string;
  residents: Character[];
  created: string;
}

export interface Info {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

// Query response types
export interface GetCharactersResponse {
  characters: {
    info: Info;
    results: Character[];
  };
}

export interface GetCharacterResponse {
  character: Character;
}

// Filter types
export interface CharacterFilter {
  name?: string;
  status?: 'alive' | 'dead' | 'unknown';
  species?: string;
  type?: string;
  gender?: 'female' | 'male' | 'genderless' | 'unknown';
}

// Local state types (for favorites and comments)
export interface CharacterComment {
  id: string;
  characterId: string;
  text: string;
  createdAt: string;
}

export interface FavoriteCharacter {
  characterId: string;
  addedAt: string;
}
