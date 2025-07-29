import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useGetCharacters, useGetCharacter } from '../useGraphQL'
import { MockedProvider } from '@apollo/client/testing'
import { GET_CHARACTERS, GET_CHARACTER_BY_ID } from '../../graphql/queries'
import type { ReactNode } from 'react'

const mockCharactersResponse = {
  characters: {
    info: {
      count: 826,
      pages: 42,
      next: 2,
      prev: null
    },
    results: [
      {
        id: '1',
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: {
          id: '1',
          name: 'Earth (C-137)',
          dimension: 'Dimension C-137'
        },
        location: {
          id: '1',
          name: 'Citadel of Ricks',
          dimension: 'unknown'
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        episode: [
          {
            id: '1',
            name: 'Pilot',
            episode: 'S01E01',
            air_date: 'December 2, 2013',
            characters: [],
            created: '2017-11-04T18:48:46.250Z'
          }
        ],
        created: '2017-11-04T18:48:46.250Z'
      }
    ]
  }
}

const mockCharacterResponse = {
  character: {
    id: '1',
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: {
      id: '1',
      name: 'Earth (C-137)',
      dimension: 'Dimension C-137'
    },
    location: {
      id: '1',
      name: 'Citadel of Ricks',
      dimension: 'unknown'
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: [
      {
        id: '1',
        name: 'Pilot',
        episode: 'S01E01',
        air_date: 'December 2, 2013',
        characters: [],
        created: '2017-11-04T18:48:46.250Z'
      }
    ],
    created: '2017-11-04T18:48:46.250Z'
  }
}

const mocks = [
  {
    request: {
      query: GET_CHARACTERS,
      variables: { page: 1, filter: {} }
    },
    result: {
      data: mockCharactersResponse
    }
  },
  {
    request: {
      query: GET_CHARACTER_BY_ID,
      variables: { id: '1' }
    },
    result: {
      data: mockCharacterResponse
    }
  }
]

const wrapper = ({ children }: { children: ReactNode }) => (
  <MockedProvider mocks={mocks} addTypename={false}>
    {children}
  </MockedProvider>
)

describe('useGetCharacters', () => {
  it('returns initial loading state', () => {
    const { result } = renderHook(() => useGetCharacters(), { wrapper })
    
    expect(result.current.loading).toBe(true)
    expect(result.current.error).toBeUndefined()
    expect(result.current.data).toBeUndefined()
  })

  it('accepts page and filter parameters', () => {
    const { result } = renderHook(() => useGetCharacters(2, { name: 'Rick' }), { wrapper })
    
    expect(result.current.loading).toBe(true)
  })
})

describe('useGetCharacter', () => {
  it('returns initial loading state with valid id', () => {
    const { result } = renderHook(() => useGetCharacter('1'), { wrapper })
    
    expect(result.current.loading).toBe(true)
    expect(result.current.error).toBeUndefined()
    expect(result.current.data).toBeUndefined()
  })

  it('skips query when no id provided', () => {
    const { result } = renderHook(() => useGetCharacter(''), { wrapper })
    
    expect(result.current.loading).toBe(false)
  })
})
