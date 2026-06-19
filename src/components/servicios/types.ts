import { Service } from '@/types'

export interface CategoryNode {
  id: string
  name: string
  services: Service[]    // servicios asignados DIRECTAMENTE a esta categoría
  children: CategoryNode[]
}
