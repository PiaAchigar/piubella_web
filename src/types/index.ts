// Database types
export interface Category {
  id: string
  name: string
  parent_category_id: string | null
  created_at: Date
}

export interface Service {
  id: string
  name: string
  description: string | null
  unit_price: string
  duration_minutes: number
  created_at: Date
  updated_at: Date
}

export interface Training {
  id: string
  name: string | null
  description: string | null
  modality: string | null // 'in_person' | 'online' | 'hybrid'
  location: string | null
  totalSessions: number | null
  durationPerSessionMinutes: number | null
  prerequisitesText: string | null
  maxParticipants: number | null
  includesCertification: boolean | null
  certificationTitle: string | null
  listPrice: number | null
  cashPrice: number | null
}

export interface ServiceProvider {
  id: string
  name: string
  email: string
  phone: string | null
  specialties: string | null
  created_at: Date
  updated_at: Date
}

export interface ProviderAvailability {
  id: string
  provider_id: string
  day_of_week: number
  start_time: string
  end_time: string
  created_at: Date
  updated_at: Date
}

export type AppointmentStatus = 'reserved' | 'scheduled' | 'completed' | 'canceled' | 'no_show'

export interface Appointment {
  id: string
  service_id: string
  provider_id: string
  customer_name: string
  customer_email: string
  customer_phone: string
  appointment_date: string
  appointment_time: string
  status: AppointmentStatus
  expires_at: Date | null
  notes: string | null
  created_at: Date
  updated_at: Date
}

export interface CompanyConfig {
  id: string
  company_name: string
  company_email: string
  company_phone: string
  company_address: string | null
  website_url: string | null
  social_media: string | null
  created_at: Date
  updated_at: Date
}

export interface OpenHours {
  id: string
  day_of_week: number
  open_time: string
  close_time: string
  is_closed: boolean
  created_at: Date
  updated_at: Date
}

// Testimonial/Review types
export interface Testimonial {
  id: string
  customer_name: string
  service_name: string
  rating: number
  comment: string
  image_url?: string
  created_at: Date
}

// FASE 3: Booking form types
export interface TimeSlot {
  id: string
  time: string // "09:00", "09:30", etc.
  available: boolean
  provider?: string
}

export interface BookingFormData {
  serviceId: string
  date: Date
  timeSlot: TimeSlot
  contactName: string
  contactEmail: string
  contactPhone: string
}

export interface BookingData extends BookingFormData {
  service: Service
  totalPrice: number
}

// Request/Response types — provider_id es asignado automáticamente por el servidor
export interface CreateAppointmentInput {
  service_id: string
  customer_name: string
  customer_email: string
  customer_phone: string
  appointment_date: string
  appointment_time: string
  notes?: string
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
}
