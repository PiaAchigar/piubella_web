import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from '@/components/ui/input'
import { expect, it, describe, vi } from 'vitest'

describe('Input', () => {
  it('should render with placeholder', () => {
    render(<Input placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  it('should render with label', () => {
    render(<Input label="Email" placeholder="email@example.com" />)
    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  it('should handle onChange event', () => {
    const handleChange = vi.fn()
    render(<Input onChange={handleChange} />)

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test' } })

    expect(handleChange).toHaveBeenCalled()
  })

  it('should render with different input types', () => {
    const { rerender } = render(<Input type="text" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text')

    rerender(<Input type="email" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email')

    rerender(<Input type="tel" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'tel')
  })

  it('should display error message when provided', () => {
    render(<Input error="This field is required" />)
    expect(screen.getByText('This field is required')).toBeInTheDocument()
  })

  it('should have error class when error is present', () => {
    render(<Input error="Error message" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('border-error')
  })

  it('should accept value prop', () => {
    render(<Input value="Test value" onChange={() => {}} />)
    expect(screen.getByRole('textbox')).toHaveValue('Test value')
  })
})
