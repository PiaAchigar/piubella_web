'use client'

import React, { ReactNode } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
    }
  }

  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error) {
    console.error('ErrorBoundary caught:', error)
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
    })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <Card className="bg-error-container border border-error max-w-md mx-auto my-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <div className="text-2xl">⚠️</div>
              <div className="flex-1">
                <h3 className="font-serif text-headline-md text-on-error-container font-bold">
                  Algo salió mal
                </h3>
                <p className="font-sans text-sm text-on-error-container mt-2">
                  {this.state.error?.message}
                </p>
              </div>
            </div>
            <Button variant="secondary" onClick={this.resetError} size="md">
              Reintentar
            </Button>
          </div>
        </Card>
      )
    }

    return this.props.children
  }
}
