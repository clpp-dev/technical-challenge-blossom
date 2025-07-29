import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'
import { FavoritesContext } from '../../context/FavoritesContext'
import SearchProvider from '../../context/SearchContext'

// Mock the useNavigate hook
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

// Mock useDebounce hook
vi.mock('../../hooks/useDebounce', () => ({
  useDebounce: (value: string) => value
}))

// Mock context values
const mockFavoritesContext = {
  favorites: [],
  addFavorite: vi.fn(),
  removeFavorite: vi.fn(),
  isFavorite: vi.fn(),
  toggleFavorite: vi.fn()
}

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <SearchProvider>
        <FavoritesContext.Provider value={mockFavoritesContext}>
          {component}
        </FavoritesContext.Provider>
      </SearchProvider>
    </BrowserRouter>
  )
}

describe('Sidebar', () => {
  const mockOnFilterChange = vi.fn()
  const mockOnSearch = vi.fn()
  const mockOnCharacterSelect = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders sidebar without crashing', () => {
    renderWithProviders(
      <Sidebar 
        onFilterChange={mockOnFilterChange}
        onSearch={mockOnSearch}
        onCharacterSelect={mockOnCharacterSelect}
      />
    )

    expect(document.body).toBeInTheDocument()
  })

  it('handles optional onCharacterSelect prop', () => {
    renderWithProviders(
      <Sidebar 
        onFilterChange={mockOnFilterChange}
        onSearch={mockOnSearch}
      />
    )

    expect(document.body).toBeInTheDocument()
  })
})