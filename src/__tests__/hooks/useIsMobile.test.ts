import { renderHook } from '@testing-library/react'
import { useIsMobile } from '@/hooks/useIsMobile'
import { expect, it, describe, beforeEach, vi } from 'vitest'

describe('useIsMobile', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return true when viewport is less than 768px', () => {
    const matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === '(max-width: 767px)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: matchMedia,
    })

    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(true)
  })

  it('should return false when viewport is 768px or greater', () => {
    const matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: matchMedia,
    })

    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)
  })

  it('should update when viewport changes', () => {
    let listeners: ((e: any) => void)[] = []
    let currentMatches = false

    const matchMedia = vi.fn().mockImplementation((query) => ({
      get matches() {
        return currentMatches
      },
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn((event: string, listener: (e: any) => void) => {
        if (event === 'change') {
          listeners.push(listener)
        }
      }),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: matchMedia,
    })

    const { result, rerender } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)

    // Simulate resize to mobile
    currentMatches = true
    listeners.forEach((listener) => listener({ matches: true }))
    rerender()
    expect(result.current).toBe(true)
  })
})
