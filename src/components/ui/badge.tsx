import { ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'tertiary' | 'error'
type Size = 'sm' | 'md' | 'lg'

interface BadgeProps {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
}

const variantStyles: Record<Variant, string> = {
  primary: 'bg-primary-fixed text-on-primary-fixed',
  secondary: 'bg-secondary-fixed text-on-secondary-fixed',
  tertiary: 'bg-tertiary-fixed text-on-tertiary-fixed',
  error: 'bg-error text-on-error',
}

const sizeStyles: Record<Size, string> = {
  sm: 'text-xs px-2 py-1',
  md: 'text-sm px-3 py-1',
  lg: 'text-base px-4 py-2',
}

export function Badge({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`inline-block rounded-full font-sans font-medium ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  )
}
