import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Home from '@/app/page'

// PAUSADO hasta el rediseño de Servicios (ver PENDIENTES.md → "La página de
// Servicios: combos y packs por clasificación").
//
// El `render(await Home())` de abajo ya es correcto: Home es un Server
// Component async y antes se le pasaba a React 18 una promesa. Lo que sigue sin
// dar son las afirmaciones: estos tests describen la home vieja —servicios
// hardcodeados como "Depilación Láser", testimonios de ejemplo, un CTA que ya
// no se llama así—. Reescribirlas contra la home actual sería tirar el trabajo
// dos veces, porque el rediseño saca los combos de Destacados y cambia las
// cards. Se reescriben junto con esa tarea.
describe.skip('Home Page', () => {
  it('renders hero section with title', async () => {
    render(await Home())
    expect(screen.getByText(/PiuBella/i)).toBeInTheDocument()
  })

  it('renders services section', async () => {
    render(await Home())
    expect(screen.getByText(/Servicios Destacados/i)).toBeInTheDocument()
  })

  it('renders service cards', async () => {
    render(await Home())
    expect(screen.getByText('Depilación Láser')).toBeInTheDocument()
    expect(screen.getByText('Masaje Relajante')).toBeInTheDocument()
    expect(screen.getByText('Facial Premium')).toBeInTheDocument()
  })

  it('renders testimonials section', async () => {
    render(await Home())
    expect(screen.getByText(/Testimoni/i)).toBeInTheDocument()
  })

  it('renders customer testimonials', async () => {
    render(await Home())
    expect(screen.getByText('María González')).toBeInTheDocument()
  })

  it('renders call to action button', async () => {
    render(await Home())
    expect(screen.getByRole('link', { name: /Agendar una cita/i })).toBeInTheDocument()
  })
})
