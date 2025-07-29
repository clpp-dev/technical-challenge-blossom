import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LoadingSpinner from '../LoadingSpinner'

describe('LoadingSpinner', () => {
  it('renders loading spinner with correct message', () => {
    render(<LoadingSpinner />)
    
    // Check if the loading message is displayed
    expect(screen.getByText('Opening portal to the multiverse')).toBeInTheDocument()
  })

  it('has correct CSS classes for animation', () => {
    render(<LoadingSpinner />)
    
    // Check if the spinner container exists
    const spinnerContainer = screen.getByText('Opening portal to the multiverse').closest('.text-center')
    expect(spinnerContainer).toBeInTheDocument()
    
    // Check if there are elements with animation classes
    const spinningElement = document.querySelector('.animate-spin')
    expect(spinningElement).toBeInTheDocument()
    
    const pulsingElement = document.querySelector('.animate-pulse')
    expect(pulsingElement).toBeInTheDocument()
  })

  it('renders with correct layout structure', () => {
    render(<LoadingSpinner />)
    
    // Check for the main container with proper classes
    const mainContainer = document.querySelector('.min-h-screen.w-full.flex.items-center.justify-center.bg-white')
    expect(mainContainer).toBeInTheDocument()
  })
})
