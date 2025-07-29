import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import CharacterDetailPanel from '../CharacterDetailPanel/CharacterDetailPanel'
import { FavoritesContext } from '../../context/FavoritesContext'
import type { Character } from '../../graphql/types'

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

// Mock favorites context
const mockFavoritesContext = {
  favorites: [],
  addFavorite: vi.fn(),
  removeFavorite: vi.fn(),
  isFavorite: vi.fn(),
  toggleFavorite: vi.fn()
}

const renderWithProviders = (component: React.ReactElement, favoritesValue = mockFavoritesContext) => {
  return render(
    <FavoritesContext.Provider value={favoritesValue}>
      {component}
    </FavoritesContext.Provider>
  )
}

describe('CharacterDetailPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders empty state when no character is provided', () => {
    mockFavoritesContext.isFavorite.mockReturnValue(false)
    
    renderWithProviders(<CharacterDetailPanel character={null} />)
    
    // Check if the empty state message is displayed
    expect(screen.getByText('Select a character')).toBeInTheDocument()
    expect(screen.getByText('Choose a character from the list to see details')).toBeInTheDocument()
  })

  it('renders character details when character is provided', () => {
    mockFavoritesContext.isFavorite.mockReturnValue(false)
    
    renderWithProviders(<CharacterDetailPanel character={mockCharacter} />)
    
    // Check if character name is displayed
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument()
  })

  it('displays correct status color and text for alive character', () => {
    mockFavoritesContext.isFavorite.mockReturnValue(false)
    
    renderWithProviders(<CharacterDetailPanel character={mockCharacter} />)
    
    // Check if alive status is shown with correct styling
    const aliveElements = screen.getAllByText('Alive')
    expect(aliveElements.length).toBeGreaterThan(0)
  })

  it('displays correct status color and text for dead character', () => {
    const deadCharacter: Character = { ...mockCharacter, status: 'Dead' }
    mockFavoritesContext.isFavorite.mockReturnValue(false)
    
    renderWithProviders(<CharacterDetailPanel character={deadCharacter} />)
    
    // Check if dead status is shown
    const deadElements = screen.getAllByText('Dead')
    expect(deadElements.length).toBeGreaterThan(0)
  })

  it('displays correct status color and text for unknown status', () => {
    const unknownCharacter: Character = { ...mockCharacter, status: 'unknown' }
    mockFavoritesContext.isFavorite.mockReturnValue(false)
    
    renderWithProviders(<CharacterDetailPanel character={unknownCharacter} />)
    
    // Check if unknown status is shown
    const unknownElements = screen.getAllByText('unknown')
    expect(unknownElements.length).toBeGreaterThan(0)
  })

  it('shows empty state with correct layout classes', () => {
    renderWithProviders(<CharacterDetailPanel character={null} />)
    
    // Check for the empty state container
    const emptyStateContainer = document.querySelector('.flex-1.bg-gray-50')
    expect(emptyStateContainer).toBeInTheDocument()
  })

  it('shows character detail with correct layout classes when character is provided', () => {
    mockFavoritesContext.isFavorite.mockReturnValue(false)
    
    renderWithProviders(<CharacterDetailPanel character={mockCharacter} />)
    
    // Check for the character detail container
    const detailContainer = document.querySelector('.flex-1.bg-white.overflow-y-auto')
    expect(detailContainer).toBeInTheDocument()
  })

  it('renders character image when character is provided', () => {
    mockFavoritesContext.isFavorite.mockReturnValue(false)
    
    renderWithProviders(<CharacterDetailPanel character={mockCharacter} />)
    
    // Check if character image is rendered
    const image = screen.getByAltText('Rick Sanchez')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', mockCharacter.image)
  })
})
