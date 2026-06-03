import { render, screen } from '@testing-library/react'
import { LoadingState } from '@/components/shared/loading-state'
import { expect, it, describe } from 'vitest'

describe('LoadingState', () => {
  it('should render spinner when isLoading is true', () => {
    render(<LoadingState isLoading={true} />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('should render loading message when provided', () => {
    render(<LoadingState isLoading={true} message="Cargando..." />)
    expect(screen.getByText('Cargando...')).toBeInTheDocument()
  })

  it('should render children when isLoading is false', () => {
    render(
      <LoadingState isLoading={false}>
        <div>Content</div>
      </LoadingState>,
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('should not render spinner when isLoading is false', () => {
    const { container } = render(
      <LoadingState isLoading={false}>
        <div>Content</div>
      </LoadingState>,
    )
    expect(container.querySelector('[role="status"]')).not.toBeInTheDocument()
  })

  it('should be fullscreen when fullscreen prop is true', () => {
    const { container } = render(<LoadingState isLoading={true} fullscreen={true} />)
    expect(container.firstChild).toHaveClass('fixed')
    expect(container.firstChild).toHaveClass('inset-0')
  })

  it('should not be fullscreen when fullscreen prop is false', () => {
    const { container } = render(<LoadingState isLoading={true} fullscreen={false} />)
    const element = container.firstChild as HTMLElement
    expect(element.className).not.toMatch(/fixed|inset-0/)
  })

  it('should render spinner with animation', () => {
    const { container } = render(<LoadingState isLoading={true} />)
    const spinner = container.querySelector('[class*="animate"]')
    expect(spinner).toBeInTheDocument()
  })
})
