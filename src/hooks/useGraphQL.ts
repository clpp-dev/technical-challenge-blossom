import { useQuery } from '@apollo/client';
import { 
  GET_CHARACTERS, 
  GET_CHARACTER_BY_ID, 
  GET_MULTIPLE_CHARACTERS,
} from '../graphql/queries';
import type { 
  GetCharactersResponse, 
  GetCharacterResponse,
  CharacterFilter
} from '../graphql/types';

// Hook for fetching characters with pagination and filters
export const useGetCharacters = (page = 1, filter?: CharacterFilter) => {
  return useQuery<GetCharactersResponse>(GET_CHARACTERS, {
    variables: { page, filter },
    errorPolicy: 'all',
  });
};

// Hook for fetching a character by ID
export const useGetCharacter = (id: string) => {
  return useQuery<GetCharacterResponse>(GET_CHARACTER_BY_ID, {
    variables: { id },
    skip: !id,
    errorPolicy: 'all',
  });
};

// Hook for fetching multiple characters by IDs
export const useGetMultipleCharacters = (ids: string[]) => {
  return useQuery(GET_MULTIPLE_CHARACTERS, {
    variables: { ids },
    skip: !ids.length,
    errorPolicy: 'all',
  });
};
