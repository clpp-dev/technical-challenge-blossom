import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { FavoritesContext } from '../FavoritesContext'
import FavoritesProvider from '../FavoritesContext'
import { useContext } from 'react'
import type { Character } from '../../graphql/types'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      store = {}
    })
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

// Mock character data
const mockCharacter: Character = {
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

const mockCharacter2: Character = {
  ...mockCharacter,
  id: '2',
  name: 'Morty Smith'
}

// Test component that uses the context
const TestComponent = () => {
  const context = useContext(FavoritesContext)
  
  if (!context) {
    return <div>No context</div>
  }

  const { favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite } = context

  return (
    <div>
      <div data-testid="favorites-count">{favorites.length}</div>
      <div data-testid="is-favorite-1">{isFavorite('1').toString()}</div>
      <div data-testid="is-favorite-2">{isFavorite('2').toString()}</div>
      <button onClick={() => addFavorite(mockCharacter)}>Add Character 1</button>
      <button onClick={() => addFavorite(mockCharacter2)}>Add Character 2</button>
      <button onClick={() => removeFavorite('1')}>Remove Character 1</button>
      <button onClick={() => toggleFavorite(mockCharacter)}>Toggle Character 1</button>
      {favorites.map(fav => (
        <div key={fav.id} data-testid={`favorite-${fav.id}`}>
          {fav.name}
        </div>
      ))}
    </div>
  )
}

describe('FavoritesContext', () => {
  beforeEach(() => {
    localStorageMock.clear()
    vi.clearAllMocks()
  })

  afterEach(() => {
    localStorageMock.clear()
  })

  it('provides initial empty favorites list', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    )

    expect(screen.getByTestId('favorites-count')).toHaveTextContent('0')
    expect(screen.getByTestId('is-favorite-1')).toHaveTextContent('false')
    expect(screen.getByTestId('is-favorite-2')).toHaveTextContent('false')
  })

  it('adds characters to favorites', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    )

    fireEvent.click(screen.getByText('Add Character 1'))
    
    expect(screen.getByTestId('favorites-count')).toHaveTextContent('1')
    expect(screen.getByTestId('is-favorite-1')).toHaveTextContent('true')
    expect(screen.getByTestId('favorite-1')).toHaveTextContent('Rick Sanchez')
  })

  it('prevents duplicate favorites', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    )

    fireEvent.click(screen.getByText('Add Character 1'))
    fireEvent.click(screen.getByText('Add Character 1'))
    
    expect(screen.getByTestId('favorites-count')).toHaveTextContent('1')
  })

  it('removes characters from favorites', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    )

    fireEvent.click(screen.getByText('Add Character 1'))
    expect(screen.getByTestId('favorites-count')).toHaveTextContent('1')
    
    fireEvent.click(screen.getByText('Remove Character 1'))
    expect(screen.getByTestId('favorites-count')).toHaveTextContent('0')
    expect(screen.getByTestId('is-favorite-1')).toHaveTextContent('false')
  })

  it('toggles character favorite status', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    )

    // Toggle to add
    fireEvent.click(screen.getByText('Toggle Character 1'))
    expect(screen.getByTestId('favorites-count')).toHaveTextContent('1')
    expect(screen.getByTestId('is-favorite-1')).toHaveTextContent('true')
    
    // Toggle to remove
    fireEvent.click(screen.getByText('Toggle Character 1'))
    expect(screen.getByTestId('favorites-count')).toHaveTextContent('0')
    expect(screen.getByTestId('is-favorite-1')).toHaveTextContent('false')
  })

  it('loads favorites from localStorage on initialization', () => {
    const savedFavorites = [mockCharacter]
    localStorageMock.getItem.mockReturnValue(JSON.stringify(savedFavorites))

    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    )

    expect(localStorageMock.getItem).toHaveBeenCalledWith('rickAndMortyFavorites')
    expect(screen.getByTestId('favorites-count')).toHaveTextContent('1')
    expect(screen.getByTestId('is-favorite-1')).toHaveTextContent('true')
  })

  it('saves favorites to localStorage when updated', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    )

    fireEvent.click(screen.getByText('Add Character 1'))
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'rickAndMortyFavorites',
      JSON.stringify([mockCharacter])
    )
  })

  it('handles localStorage errors gracefully', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    localStorageMock.getItem.mockReturnValue('invalid-json')

    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    )

    expect(consoleSpy).toHaveBeenCalledWith('Error loading favorites from localStorage:', expect.any(Error))
    expect(screen.getByTestId('favorites-count')).toHaveTextContent('0')
    
    consoleSpy.mockRestore()
  })

  it('manages multiple characters correctly', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    )

    fireEvent.click(screen.getByText('Add Character 1'))
    fireEvent.click(screen.getByText('Add Character 2'))
    
    expect(screen.getByTestId('favorites-count')).toHaveTextContent('2')
    expect(screen.getByTestId('is-favorite-1')).toHaveTextContent('true')
    expect(screen.getByTestId('is-favorite-2')).toHaveTextContent('true')
    expect(screen.getByTestId('favorite-1')).toHaveTextContent('Rick Sanchez')
    expect(screen.getByTestId('favorite-2')).toHaveTextContent('Morty Smith')
  })
})
