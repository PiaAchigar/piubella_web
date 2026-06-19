import { workerGet } from '@/lib/worker-client'
import { Service, TimeSlot } from '@/types'

// ─── Tipos que devuelve el Worker ────────────────────────────────────────────

export interface WorkerCategory {
  id: string
  name: string
  description: string | null
  displayOrder: number
  children: WorkerCategory[]
}

export interface WorkerService {
  id: string
  name: string
  description: string | null
  code: string | null
  unitPriceList: number | null
  unitPriceCash: number | null
  taxCategory: string
  requiresOperator: boolean
  requiresMachine: boolean
  estimatedDurationMinutes: number
  categories: { id: string; name: string }[]
}

export interface WorkerAvailabilitySlot {
  start: string // "HH:MM"
  end: string   // "HH:MM"
  options: { providerId: string; providerName: string; machineId: string | null }[]
}

export interface WorkerAvailability {
  date: string
  serviceId: string
  durationMinutes: number
  slots: WorkerAvailabilitySlot[]
}

export interface WorkerCompanyConfig {
  companyName: string
  companyDescription: string | null
  address: string | null
  phone: string | null
  email: string | null
  whatsapp: string | null
  instagram: string | null
  website: string | null
  openHours: {
    dayOfWeek: number
    openingTime: string | null
    closingTime: string | null
    isOpen: boolean
  }[]
}

// ─── Mappers: Worker → tipos de UI ───────────────────────────────────────────

export function flattenCategories(cats: WorkerCategory[]): { id: string; name: string }[] {
  return cats.flatMap((cat) => [
    { id: cat.id, name: cat.name },
    ...flattenCategories(cat.children),
  ])
}

export function mapService(s: WorkerService): Service {
  return {
    id: s.id,
    name: s.name,
    description: s.description,
    unit_price: s.unitPriceList != null ? String(s.unitPriceList) : '',
    duration_minutes: s.estimatedDurationMinutes ?? 0,
    created_at: new Date(0),
    updated_at: new Date(0),
  }
}

export function mapAvailabilitySlots(availability: WorkerAvailability): TimeSlot[] {
  return availability.slots.map((slot) => ({
    id: slot.start,
    time: slot.start,
    available: true,
    provider: slot.options[0]?.providerId,
  }))
}

// ─── Fetchers tipados ─────────────────────────────────────────────────────────

export async function fetchCategoryTree(
  fetchOptions?: { revalidate?: number },
): Promise<WorkerCategory[]> {
  return (await workerGet('/api/agenda/categories', {
    next: { revalidate: fetchOptions?.revalidate ?? 3600 },
  })) as WorkerCategory[]
}

export async function fetchCategories(
  fetchOptions?: { revalidate?: number },
): Promise<{ id: string; name: string }[]> {
  const raw = await fetchCategoryTree(fetchOptions)
  return flattenCategories(raw)
}

export async function fetchServices(
  params?: { categoryId?: string; q?: string },
  fetchOptions?: { revalidate?: number },
): Promise<Service[]> {
  const qs = new URLSearchParams()
  if (params?.categoryId) qs.set('categoryId', params.categoryId)
  if (params?.q) qs.set('q', params.q)
  const path = `/api/agenda/services${qs.toString() ? `?${qs}` : ''}`
  const raw = (await workerGet(path, {
    next: { revalidate: fetchOptions?.revalidate ?? 3600 },
  })) as WorkerService[]
  return raw.map(mapService)
}

export async function fetchAvailability(
  serviceId: string,
  date: string,
): Promise<TimeSlot[]> {
  const raw = (await workerGet(
    `/api/agenda/availability/${serviceId}?date=${date}`,
  )) as WorkerAvailability
  return mapAvailabilitySlots(raw)
}

export async function fetchCompanyConfig(): Promise<WorkerCompanyConfig> {
  return (await workerGet('/api/agenda/company-config', {
    next: { revalidate: 3600 },
  })) as WorkerCompanyConfig
}
