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
  return useQuery<GetCharactersResponse>(GET_CHARACTERS, {
    variables: { page, filter },
    errorPolicy: 'all',
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
