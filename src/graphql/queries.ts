import { gql } from '@apollo/client';

// Rick and Morty API Queries

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        species
        type
        gender
        origin {
          id
          name
          dimension
        }
        location {
          id
          name
          dimension
        }
        image
        episode {
          id
          name
          episode
        }
        created
      }
    }
  }
`;

export const GET_CHARACTER_BY_ID = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      origin {
        id
        name
        dimension
      }
      location {
        id
        name
        dimension
      }
      image
      episode {
        id
        name
        air_date
        episode
      }
      created
    }
  }
`;

export const GET_MULTIPLE_CHARACTERS = gql`
  query GetMultipleCharacters($ids: [ID!]!) {
    charactersByIds(ids: $ids) {
      id
      name
      status
      species
      type
      gender
      origin {
        id
        name
        dimension
      }
      location {
        id
        name
        dimension
      }
      image
      created
    }
  }
`;

export const GET_EPISODES = gql`
  query GetEpisodes($page: Int) {
    episodes(page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        air_date
        episode
        characters {
          id
          name
          image
        }
        created
      }
    }
  }
`;

export const GET_LOCATIONS = gql`
  query GetLocations($page: Int) {
    locations(page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        type
        dimension
        residents {
          id
          name
          image
        }
        created
      }
    }
  }
`;
