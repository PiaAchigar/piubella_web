'use client'

import { ReactNode } from 'react'

interface LoadingStateProps {
  isLoading: boolean
  children?: ReactNode
  message?: string
  fullscreen?: boolean
}

export function LoadingState({
  isLoading,
  children,
  message = 'Cargando...',
  fullscreen = false,
}: LoadingStateProps) {
  if (!isLoading) {
    return children
  }

  const containerClass = fullscreen
    ? 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
    : 'flex flex-col items-center justify-center gap-4 py-12'

  return (
    <div className={containerClass}>
      <div className="flex flex-col items-center gap-4">
        <div
          role="status"
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-outline border-t-primary"
          aria-label="Cargando"
        />
        {message && <p className="font-sans text-body-md text-on-surface">{message}</p>}
      </div>
    </div>
  )
}
