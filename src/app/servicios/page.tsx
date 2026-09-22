import {
  fetchActivities,
  fetchCategoryTree,
  fetchCombos,
  fetchDepilationPacks,
  fetchPromotions,
  fetchServices,
  fetchTrainings,
  WorkerCategory,
  WorkerCombo,
  WorkerDepilationPack,
  WorkerPromotion,
} from '@/lib/worker-api'
import { Activity, Service, Training } from '@/types'
import { CategoryNode } from '@/components/servicios/types'
import { ServiciosClient } from '@/components/servicios/servicios-client'
import { siFalla } from '@/lib/si-falla'
import { PromosHero } from '@/components/servicios/promos-hero'

// Las categorías de eje `area` (Estética, Medicina y Dermatología, Masajes y
// Bienestar...) existen para las PESTAÑAS del dashboard, no para el sitio: acá
// duplicarían todo el árbol, porque cada servicio ya cuelga de su técnica.
// Los otros ejes —técnica, objetivo, máquina— sí se muestran, igual que hoy.
//
// El filtro por nombre '(Eje)' se mantiene para las dos categorías viejas de la
// 1.26.0, que están archivadas pero no dependen de `kind`.
function esVisibleEnLaWeb(c: WorkerCategory): boolean {
  return c.kind !== 'area' && !c.name.includes('Eje')
}

// Construye el nodo recursivamente: fetcha servicios propios + recursa en hijos
async function buildNode(cat: WorkerCategory): Promise<CategoryNode> {
  const visibleChildren = cat.children.filter(esVisibleEnLaWeb)

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

function getCategoryTree(): Promise<CategoryNode[]> {
  return siFalla('el árbol de categorías', async () => {
    const tree = await fetchCategoryTree()
    const visibleRoots = tree.filter(esVisibleEnLaWeb)
    const nodes = await Promise.all(visibleRoots.map((c) => buildNode(c)))
    return nodes.filter((n) => n.services.length > 0 || n.children.length > 0)
  }, [])
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
  const trainings = await siFalla<Training[]>('las capacitaciones', fetchTrainings, [])
  // Actividades (Pilates, Thermobike) viven en su propia tabla, no en `service`;
  // si el Worker no responde, /servicios igual renderiza sin esta sección.
  const activities = await siFalla<Activity[]>('las actividades', fetchActivities, [])
  const [combos, packs, promos] = await Promise.all([
    siFalla<WorkerCombo[]>('los combos', fetchCombos, []),
    siFalla<WorkerDepilationPack[]>('los packs de depilación', fetchDepilationPacks, []),
    siFalla<WorkerPromotion[]>('las promos', fetchPromotions, []),
  ])
  return (
    <>
      <PromosHero />
      <ServiciosClient
        tree={tree}
        allServices={allServices}
        trainings={trainings}
        activities={activities}
        combos={combos}
        packs={packs}
        promos={promos}
      />
    </>
  )
}
