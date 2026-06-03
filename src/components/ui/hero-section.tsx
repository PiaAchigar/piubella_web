import Link from 'next/link'
import { ReactNode } from 'react'

interface HeroSectionProps {
  title: ReactNode
  description: ReactNode
  ctaText?: string
  ctaHref?: string
  backgroundColor?: string
  children?: ReactNode
}

export function HeroSection({
  title,
  description,
  ctaText,
  ctaHref,
  backgroundColor = 'bg-primary-container',
  children,
}: HeroSectionProps) {
  return (
    <section className={`${backgroundColor} py-16 md:py-24 text-center`}>
      <div className="container">
        <h1 className="font-serif text-display-lg md:text-display-xl font-bold text-on-surface mb-6">
          {title}
        </h1>
        <p className="font-sans text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-8">
          {description}
        </p>
        {ctaText && ctaHref && (
          <Link
            href={ctaHref}
            className="inline-block px-8 py-3 bg-primary text-white font-sans font-semibold rounded transition-colors hover:bg-primary-container"
          >
            {ctaText}
          </Link>
        )}
        {children}
      </div>
    </section>
  )
}
