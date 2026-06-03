import { render, screen } from '@testing-library/react'
import { ErrorBoundary } from '@/components/shared/error-boundary'
import { expect, it, describe, vi, beforeEach, afterEach } from 'vitest'

const ThrowError = () => {
  throw new Error('Test error')
}

const WorkingComponent = () => <div>Working component</div>

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should render children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <WorkingComponent />
      </ErrorBoundary>,
    )

    expect(screen.getByText('Working component')).toBeInTheDocument()
  })

  it('should catch errors and display fallback UI', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    )

    expect(screen.getByText(/algo salió mal/i)).toBeInTheDocument()
  })

  it('should display error message in fallback', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    )

    expect(screen.getByText('Test error')).toBeInTheDocument()
  })

  it('should have a retry button in fallback', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    )

    expect(screen.getByRole('button', { name: /reintentar/i })).toBeInTheDocument()
  })

  it('should render custom fallback if provided', () => {
    render(
      <ErrorBoundary fallback={<div>Custom error UI</div>}>
        <ThrowError />
      </ErrorBoundary>,
    )

    expect(screen.getByText('Custom error UI')).toBeInTheDocument()
  })
})
