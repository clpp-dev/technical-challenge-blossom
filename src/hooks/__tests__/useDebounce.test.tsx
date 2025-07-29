import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDebounce } from '../useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500))
    
    expect(result.current).toBe('initial')
  })

  it('debounces value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 }
      }
    )

    // Initial value should be set
    expect(result.current).toBe('initial')

    // Change the value
    rerender({ value: 'updated', delay: 500 })

    // Value should not change immediately
    expect(result.current).toBe('initial')

    // Fast-forward time by less than delay
    act(() => {
      vi.advanceTimersByTime(300)
    })

    // Value should still be the initial value
    expect(result.current).toBe('initial')

    // Fast-forward time to complete the delay
    act(() => {
      vi.advanceTimersByTime(200)
    })

    // Now the value should be updated
    expect(result.current).toBe('updated')
  })

  it('resets timer on multiple rapid changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 }
      }
    )

    // Change value multiple times rapidly
    rerender({ value: 'change1', delay: 500 })
    
    act(() => {
      vi.advanceTimersByTime(300)
    })
    
    rerender({ value: 'change2', delay: 500 })
    
    act(() => {
      vi.advanceTimersByTime(300)
    })
    
    rerender({ value: 'final', delay: 500 })

    // Value should still be initial since timer keeps resetting
    expect(result.current).toBe('initial')

    // Fast-forward to complete the final delay
    act(() => {
      vi.advanceTimersByTime(500)
    })

    // Should show the final value
    expect(result.current).toBe('final')
  })

  it('works with different data types', () => {
    // Test with numbers
    const { result: numberResult, rerender: numberRerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 0, delay: 500 }
      }
    )

    expect(numberResult.current).toBe(0)

    numberRerender({ value: 42, delay: 500 })

    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(numberResult.current).toBe(42)

    // Test with objects
    const initialObj = { name: 'initial' }
    const updatedObj = { name: 'updated' }

    const { result: objectResult, rerender: objectRerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: initialObj, delay: 500 }
      }
    )

    expect(objectResult.current).toBe(initialObj)

    objectRerender({ value: updatedObj, delay: 500 })

    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(objectResult.current).toBe(updatedObj)
  })

  it('handles delay changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 }
      }
    )

    rerender({ value: 'updated', delay: 1000 })

    // Fast-forward by original delay time
    act(() => {
      vi.advanceTimersByTime(500)
    })

    // Should still be initial since delay was increased
    expect(result.current).toBe('initial')

    // Fast-forward by remaining time
    act(() => {
      vi.advanceTimersByTime(500)
    })

    // Now should be updated
    expect(result.current).toBe('updated')
  })
})
