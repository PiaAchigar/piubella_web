import { render, screen } from '@testing-library/react'
import { Footer } from '@/components/layout/footer'
import { expect, it, describe } from 'vitest'

// El Footer es un Server Component async: se lo invoca y se renderiza el
// elemento que devuelve. `render(<Footer />)` le daría a React 18 una promesa.
// Sin Worker, `fetchCompanyConfig` falla y el componente cae a sus valores por
// defecto — que es justamente lo que se verifica acá.
describe('Footer', () => {
  it('muestra el nombre de la empresa', async () => {
    render(await Footer())
    expect(screen.getByText('Piu Bella Estética & Pilates')).toBeInTheDocument()
  })

  it('muestra la tagline', async () => {
    render(await Footer())
    expect(screen.getByText(/bienestar integral/i)).toBeInTheDocument()
  })

  it('muestra los links legales', async () => {
    render(await Footer())
    expect(screen.getByRole('link', { name: /privacidad/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /términos/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /cookies/i })).toBeInTheDocument()
  })

  it('muestra los accesos de contacto con sus destinos por defecto', async () => {
    render(await Footer())
    expect(screen.getByLabelText('Whatsapp')).toHaveAttribute(
      'href',
      'https://wa.me/5491133775014',
    )
    expect(screen.getByLabelText('Email')).toHaveAttribute(
      'href',
      'mailto:info@piubellaesteticapilates.com.ar',
    )
    expect(screen.getByLabelText('Ubicación')).toBeInTheDocument()
  })

  it('muestra el copyright con el año corriente', async () => {
    render(await Footer())
    const year = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`© ${year} Complexa IA`, 'i'))).toBeInTheDocument()
  })

  it('tiene el borde superior que lo separa del contenido', async () => {
    const { container } = render(await Footer())
    expect(container.querySelector('footer')).toHaveClass('border-t')
  })

  it('queda pegado al fondo cuando la página es corta', async () => {
    const { container } = render(await Footer())
    expect(container.querySelector('footer')).toHaveClass('mt-auto')
  })
})
