'use client'

import { useQuery } from '@tanstack/react-query'

async function fetchCategories() {
  const res = await fetch('/api/categories')
  if (!res.ok) throw new Error('Error al cargar categorías')
  const json = await res.json()
  return json.data as Array<{ id: string; name: string }>
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 10, // 10 min — las categorías cambian poco
  })
}
