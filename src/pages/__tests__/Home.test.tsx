import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Home from '../Home'

// Mock useNavigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('Home', () => {
  it('redirects to characters page immediately', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )

    expect(mockNavigate).toHaveBeenCalledWith('/characters', { replace: true })
  })

  it('renders nothing (null)', () => {
    const { container } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )

    expect(container.firstChild).toBeNull()
  })
})
