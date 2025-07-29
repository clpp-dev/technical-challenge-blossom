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

export const useGetCharacters = (page = 1, filter?: CharacterFilter) => {
  console.log('useGetCharacters called with:', { page, filter });
  
  return useQuery<GetCharactersResponse>(GET_CHARACTERS, {
    variables: { page, filter },
    errorPolicy: 'all',
    onCompleted: () => {
      console.log('Query completed');
    },
    onError: (error) => {
      console.error('Query error:', error);
    }
  });
};

export const useGetCharacter = (id: string) => {
  return useQuery<GetCharacterResponse>(GET_CHARACTER_BY_ID, {
    variables: { id },
    skip: !id,
    errorPolicy: 'all',
  });
};

export const useGetMultipleCharacters = (ids: string[]) => {
  return useQuery(GET_MULTIPLE_CHARACTERS, {
    variables: { ids },
    skip: !ids.length,
    errorPolicy: 'all',
  });
};
