import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useFavorites } from '../../hooks/useFavorites'
import { FavoritesContext } from '../../context/FavoritesContext'
import type { ReactNode } from 'react'

// Mock context value
const mockFavoritesContext = {
  favorites: [],
  addFavorite: vi.fn(),
  removeFavorite: vi.fn(),
  isFavorite: vi.fn(),
  toggleFavorite: vi.fn()
}

const wrapper = ({ children }: { children: ReactNode }) => (
  <FavoritesContext.Provider value={mockFavoritesContext}>
    {children}
  </FavoritesContext.Provider>
)

describe('useFavorites', () => {
  it('returns context values when used within provider', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper })
    
    expect(result.current).toBe(mockFavoritesContext)
    expect(typeof result.current.addFavorite).toBe('function')
    expect(typeof result.current.removeFavorite).toBe('function')
    expect(typeof result.current.isFavorite).toBe('function')
    expect(typeof result.current.toggleFavorite).toBe('function')
    expect(Array.isArray(result.current.favorites)).toBe(true)
  })

  it('throws error when used outside of provider', () => {
    // Mock console.error to prevent error output in tests
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    expect(() => {
      renderHook(() => useFavorites())
    }).toThrow('useFavorites must be used within a FavoritesProvider')
    
    consoleSpy.mockRestore()
  })
})
