import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-surface-container rounded shadow-sm p-6 ${className}`}>
      {children}
    </div>
  )
}
