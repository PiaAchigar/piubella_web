'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

const NAV_ITEMS = [
  { label: 'Inicio', href: '/' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Contacto', href: '/contacto' },
  { label: 'Agenda', href: '/agenda' },
]

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href ? 'text-primary' : 'text-on-surface'

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <nav className="w-full sticky top-0 z-50 bg-surface/90 backdrop-blur-md border-b border-outline-variant/30" role="navigation">
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo_marron.png"
            alt="Piu Bella logo"
            width={60}
            height={60}
            className="w-auto object-contain"
            priority
          />
        </Link>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex flex-col gap-1 p-2 rounded hover:bg-surface-container-high transition-colors"
          aria-label="Menú"
          aria-expanded={isMobileMenuOpen}
        >
          <span className={`block h-0.5 w-6 bg-on-surface transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-0.5 w-6 bg-on-surface transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-on-surface transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex gap-8 items-center">
          {NAV_ITEMS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`font-sans text-body-md font-medium transition-colors hover:text-primary ${isActive(href)}`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/agenda"
            className="bg-primary text-on-primary px-6 py-2 rounded-lg font-sans text-label-md tracking-widest uppercase hover:opacity-90 transition-all"
          >
            Reservar Cita
          </Link>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface-container border-t border-outline-variant px-4 py-4 flex flex-col gap-4 animate-in fade-in duration-200">
          {NAV_ITEMS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={closeMobileMenu}
              className={`font-sans text-body-md font-medium transition-colors hover:text-primary py-2 border-b border-outline-variant last:border-b-0 ${isActive(href)}`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
