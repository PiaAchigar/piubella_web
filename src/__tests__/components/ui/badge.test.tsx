import { render, screen } from '@testing-library/react'
import { Badge } from '@/components/ui/badge'
import { expect, it, describe } from 'vitest'

describe('Badge', () => {
  it('should render with text', () => {
    render(<Badge>New</Badge>)
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('should render with primary variant by default', () => {
    const { container } = render(<Badge>Primary</Badge>)
    const badge = container.firstChild
    expect(badge).toHaveClass('bg-primary-fixed')
  })

  it('should render with secondary variant', () => {
    const { container } = render(<Badge variant="secondary">Secondary</Badge>)
    const badge = container.firstChild
    expect(badge).toHaveClass('bg-secondary-fixed')
  })

  it('should render with tertiary variant', () => {
    const { container } = render(<Badge variant="tertiary">Tertiary</Badge>)
    const badge = container.firstChild
    expect(badge).toHaveClass('bg-tertiary-fixed')
  })

  it('should render with error variant', () => {
    const { container } = render(<Badge variant="error">Error</Badge>)
    const badge = container.firstChild
    expect(badge).toHaveClass('bg-error')
  })

  it('should render with different sizes', () => {
    const { rerender, container } = render(<Badge size="sm">Small</Badge>)
    expect(container.firstChild).toHaveClass('text-xs')

    rerender(<Badge size="md">Medium</Badge>)
    expect(container.firstChild).toHaveClass('text-sm')

    rerender(<Badge size="lg">Large</Badge>)
    expect(container.firstChild).toHaveClass('text-base')
  })

  it('should have proper padding and border radius', () => {
    const { container } = render(<Badge>Badge</Badge>)
    const badge = container.firstChild
    expect(badge).toHaveClass('px-3')
    expect(badge).toHaveClass('py-1')
    expect(badge).toHaveClass('rounded-full')
  })
})
