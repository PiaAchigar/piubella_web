import { render, screen } from '@testing-library/react'
import { Card } from '@/components/ui/card'
import { expect, it, describe } from 'vitest'

describe('Card', () => {
  it('should render children', () => {
    render(<Card>Card content</Card>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('should have shadow class', () => {
    const { container } = render(<Card>Content</Card>)
    const card = container.querySelector('[class*="shadow"]')
    expect(card).toBeInTheDocument()
  })

  it('should have proper padding', () => {
    const { container } = render(<Card>Content</Card>)
    const card = container.firstChild
    expect(card).toHaveClass('p-6')
  })

  it('should have rounded corners', () => {
    const { container } = render(<Card>Content</Card>)
    const card = container.firstChild
    expect(card).toHaveClass('rounded')
  })

  it('should have background color', () => {
    const { container } = render(<Card>Content</Card>)
    const card = container.firstChild
    expect(card).toHaveClass('bg-surface-container')
  })

  it('should accept className prop', () => {
    const { container } = render(<Card className="custom-class">Content</Card>)
    const card = container.firstChild
    expect(card).toHaveClass('custom-class')
  })
})
