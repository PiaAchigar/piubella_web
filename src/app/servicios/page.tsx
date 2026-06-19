import { fetchCategoryTree, fetchServices, WorkerCategory } from '@/lib/worker-api'
import { Service } from '@/types'
import { CategoryNode } from '@/components/servicios/types'
import { ServiciosClient } from '@/components/servicios/servicios-client'

// Construye el nodo recursivamente: fetcha servicios propios + recursa en hijos
async function buildNode(cat: WorkerCategory): Promise<CategoryNode> {
  const visibleChildren = cat.children.filter((c) => !c.name.includes('Eje'))

  const [services, children] = await Promise.all([
    fetchServices({ categoryId: cat.id }),
    Promise.all(visibleChildren.map((c) => buildNode(c))),
  ])

  return {
    id: cat.id,
    name: cat.name,
    services,
    children: children.filter((c) => c.services.length > 0 || c.children.length > 0),
  }
}

async function getCategoryTree(): Promise<CategoryNode[]> {
  try {
    const tree = await fetchCategoryTree()
    const visibleRoots = tree.filter((c) => !c.name.includes('Eje'))
    const nodes = await Promise.all(visibleRoots.map((c) => buildNode(c)))
    return nodes.filter((n) => n.services.length > 0 || n.children.length > 0)
  } catch {
    return []
  }
}

// Aplana el árbol completo eliminando duplicados por id (un servicio puede estar en varias categorías)
function flattenUnique(nodes: CategoryNode[]): Service[] {
  const seen = new Set<string>()
  const result: Service[] = []
  function walk(nodes: CategoryNode[]) {
    for (const n of nodes) {
      for (const s of n.services) {
        if (!seen.has(s.id)) { seen.add(s.id); result.push(s) }
      }
      walk(n.children)
    }
  }
  walk(nodes)
  return result.sort((a, b) => a.name.localeCompare(b.name, 'es'))
}

export default async function Servicios() {
  const tree = await getCategoryTree()
  const allServices = flattenUnique(tree)
  return <ServiciosClient tree={tree} allServices={allServices} />
}
