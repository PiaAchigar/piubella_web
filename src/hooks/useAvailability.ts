'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { TimeSlot } from '@/types'
import { formatDateISO } from '@/lib/calendar-utils'

async function fetchAvailability(dateStr: string, serviceId: string): Promise<TimeSlot[]> {
  const res = await fetch(`/api/availability?date=${dateStr}&serviceId=${serviceId}`)
  if (!res.ok) throw new Error('Error al cargar disponibilidad')
  const json = await res.json()
  return json.data
}

export function useAvailability(date?: Date, serviceId?: string) {
  const queryClient = useQueryClient()
  const dateStr = date ? formatDateISO(date) : null

  const query = useQuery({
    queryKey: ['availability', dateStr, serviceId],
    queryFn: () => fetchAvailability(dateStr!, serviceId!),
    enabled: !!dateStr && !!serviceId,
    staleTime: 30 * 1000,
  })

  useEffect(() => {
    if (!dateStr) return

    const supabase = createClient()
    const channel = supabase
      .channel(`availability:${dateStr}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'appointments' },
        () => {
          queryClient.invalidateQueries({ queryKey: ['availability', dateStr] })
        },
      )
      .subscribe()

    return () => { channel.unsubscribe() }
  }, [dateStr, queryClient])

  return query
}
