'use client'

import { useQuery } from '@tanstack/react-query'
import { Service } from '@/types'

async function fetchServices(categoryId?: string): Promise<Service[]> {
  const url = categoryId ? `/api/services?categoryId=${categoryId}` : '/api/services'
  const res = await fetch(url)
  if (!res.ok) throw new Error('Error al cargar servicios')
  const json = await res.json()
  return json.data
}

export function useServices(categoryId?: string) {
  return useQuery({
    queryKey: ['services', categoryId],
    queryFn: () => fetchServices(categoryId),
    staleTime: 1000 * 60 * 5, // 5 min
  })
}
