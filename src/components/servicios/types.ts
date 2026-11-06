import { Service } from '@/types'

export interface CategoryNode {
  id: string
  name: string
  /** El texto de Sitio Web → Textos → Categorías, debajo del título. */
  descripcionWeb?: string | null
  services: Service[]    // servicios asignados DIRECTAMENTE a esta categoría
  children: CategoryNode[]
}
