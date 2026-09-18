import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PackCard } from '@/components/servicios/pack-card'
import type { WorkerDepilationPack } from '@/lib/worker-api'

const base: WorkerDepilationPack = {
  id: 'p1',
  name: 'Cuerpo Full',
  description: null,
  fixedPrice: 65000,
  fixedDurationMinutes: 90,
  choiceZoneCount: 0,
  zonas: ['Axilas', 'Piernas completas'],
}

describe('PackCard', () => {
  it('lleva la pastilla "Pack"', () => {
    render(<PackCard pack={base} />)
    expect(screen.getByText('Pack')).toBeInTheDocument()
  })

  it('muestra el nombre y el precio', () => {
    render(<PackCard pack={base} />)
    expect(screen.getByText('Cuerpo Full')).toBeInTheDocument()
    expect(screen.getByText('$65.000')).toBeInTheDocument()
  })

  it('desglosa las zonas que incluye', () => {
    render(<PackCard pack={base} />)
    expect(screen.getByText('Axilas')).toBeInTheDocument()
    expect(screen.getByText('Piernas completas')).toBeInTheDocument()
  })

  it('cuando hay zonas a elección lo dice', () => {
    render(<PackCard pack={{ ...base, choiceZoneCount: 2 }} />)
    expect(screen.getByText(/elegís 2 zonas/i)).toBeInTheDocument()
  })

  it('en singular cuando es una sola zona a elección', () => {
    render(<PackCard pack={{ ...base, choiceZoneCount: 1 }} />)
    // `\b` no sobra: sin él, /elegís 1 zona/ también matchea "elegís 1 zonas",
    // y el test seguiría verde si alguien rompiera el singular/plural.
    expect(screen.getByText(/elegís 1 zona\b/i)).toBeInTheDocument()
  })

  it('sin precio no dibuja un precio vacío', () => {
    render(<PackCard pack={{ ...base, fixedPrice: null }} />)
    expect(screen.queryByText(/^\$/)).toBeNull()
  })

  it('NO muestra precio tachado: un pack no tiene contra qué compararse', () => {
    const { container } = render(<PackCard pack={base} />)
    expect(container.querySelector('.line-through')).toBeNull()
  })
})
