import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import CharacterCard from '../Sidebar/components/CharacterCard'
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
    <BrowserRouter>
      <FavoritesContext.Provider value={favoritesValue}>
        {component}
      </FavoritesContext.Provider>
    </BrowserRouter>
  )
}

describe('CharacterCard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders character information correctly', () => {
    mockFavoritesContext.isFavorite.mockReturnValue(false)
    
    renderWithProviders(<CharacterCard character={mockCharacter} />)
    
    // Check if character name is displayed
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument()
    
    // Check if species is displayed
    expect(screen.getByText('Human')).toBeInTheDocument()
    
    // Check if gender is displayed
    expect(screen.getByText('Male')).toBeInTheDocument()
    
    // Check if origin is displayed
    expect(screen.getByText('Earth (C-137)')).toBeInTheDocument()
    
    // Check if episode count is displayed
    expect(screen.getByText('1 episode')).toBeInTheDocument()
  })

  it('displays correct status color for alive character', () => {
    mockFavoritesContext.isFavorite.mockReturnValue(false)
    
    renderWithProviders(<CharacterCard character={mockCharacter} />)
    
    // Check if status is displayed
    expect(screen.getByText('Alive')).toBeInTheDocument()
    
    // Check if the status indicator has the correct class
    const statusIndicator = document.querySelector('.bg-green-500')
    expect(statusIndicator).toBeInTheDocument()
  })

  it('displays correct status color for dead character', () => {
    const deadCharacter: Character = { ...mockCharacter, status: 'Dead' }
    mockFavoritesContext.isFavorite.mockReturnValue(false)
    
    renderWithProviders(<CharacterCard character={deadCharacter} />)
    
    expect(screen.getByText('Dead')).toBeInTheDocument()
    const statusIndicator = document.querySelector('.bg-red-500')
    expect(statusIndicator).toBeInTheDocument()
  })

  it('displays correct status color for unknown status', () => {
    const unknownCharacter: Character = { ...mockCharacter, status: 'unknown' }
    mockFavoritesContext.isFavorite.mockReturnValue(false)
    
    renderWithProviders(<CharacterCard character={unknownCharacter} />)
    
    expect(screen.getByText('unknown')).toBeInTheDocument()
    const statusIndicator = document.querySelector('.bg-gray-500')
    expect(statusIndicator).toBeInTheDocument()
  })

  it('handles favorite toggle correctly', () => {
    mockFavoritesContext.isFavorite.mockReturnValue(false)
    
    renderWithProviders(<CharacterCard character={mockCharacter} />)
    
    // Find and click the favorite button
    const favoriteButton = document.querySelector('button')
    expect(favoriteButton).toBeInTheDocument()
    
    fireEvent.click(favoriteButton!)
    
    // Check if toggleFavorite was called with the correct character
    expect(mockFavoritesContext.toggleFavorite).toHaveBeenCalledWith(mockCharacter)
  })

  it('shows different heart icon when character is favorited', () => {
    mockFavoritesContext.isFavorite.mockReturnValue(true)
    
    renderWithProviders(<CharacterCard character={mockCharacter} />)
    
    // Check if the heart icon has the filled/favorited styling
    const heartIcon = document.querySelector('.text-green-500.fill-current')
    expect(heartIcon).toBeInTheDocument()
  })

  it('shows unfilled heart icon when character is not favorited', () => {
    mockFavoritesContext.isFavorite.mockReturnValue(false)
    
    renderWithProviders(<CharacterCard character={mockCharacter} />)
    
    // Check if the heart icon has the unfilled styling
    const heartIcon = document.querySelector('.text-white.hover\\:text-green-400')
    expect(heartIcon).toBeInTheDocument()
  })

  it('renders character image with correct attributes', () => {
    mockFavoritesContext.isFavorite.mockReturnValue(false)
    
    renderWithProviders(<CharacterCard character={mockCharacter} />)
    
    const image = screen.getByAltText('Rick Sanchez')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', mockCharacter.image)
    expect(image).toHaveAttribute('loading', 'lazy')
  })

  it('handles plural episode count correctly', () => {
    const characterWithMultipleEpisodes: Character = {
      ...mockCharacter,
      episode: [
        { 
          id: '1', 
          name: 'Episode 1', 
          episode: 'S01E01',
          air_date: 'December 2, 2013',
          characters: [],
          created: '2017-11-04T18:48:46.250Z'
        },
        { 
          id: '2', 
          name: 'Episode 2', 
          episode: 'S01E02',
          air_date: 'December 9, 2013',
          characters: [],
          created: '2017-11-04T18:48:46.250Z'
        }
      ]
    }
    mockFavoritesContext.isFavorite.mockReturnValue(false)
    
    renderWithProviders(<CharacterCard character={characterWithMultipleEpisodes} />)
    
    expect(screen.getByText('2 episodes')).toBeInTheDocument()
  })

  it('displays type when character has a type', () => {
    const characterWithType = { ...mockCharacter, type: 'Scientist' }
    mockFavoritesContext.isFavorite.mockReturnValue(false)
    
    renderWithProviders(<CharacterCard character={characterWithType} />)
    
    expect(screen.getByText('Scientist')).toBeInTheDocument()
  })
})
