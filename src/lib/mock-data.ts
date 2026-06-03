import { Service, Testimonial, TimeSlot, ServiceProvider } from '@/types'

export const MOCK_SERVICES: Service[] = [
  {
    id: '1',
    name: 'Depilación Láser',
    description: 'Depilación permanente con última tecnología láser. Eliminación efectiva de vello corporal.',
    unit_price: '150.00',
    duration_minutes: 60,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: '2',
    name: 'Masaje Relajante',
    description: 'Masaje terapéutico para aliviar tensiones musculares y reducir estrés.',
    unit_price: '120.00',
    duration_minutes: 90,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: '3',
    name: 'Facial Premium',
    description: 'Tratamiento facial completo con productos premium para rejuvenecimiento cutáneo.',
    unit_price: '100.00',
    duration_minutes: 60,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: '4',
    name: 'Manicura y Pedicura',
    description: 'Cuidado completo de manos y pies con diseños personalizados.',
    unit_price: '80.00',
    duration_minutes: 45,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: '5',
    name: 'Tratamiento Capilar',
    description: 'Tratamientos especializados para cabello dañado, alopecia y caída.',
    unit_price: '90.00',
    duration_minutes: 45,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: '6',
    name: 'Bronceado en Cabina',
    description: 'Bronceado seguro en cabina de rayos UVA certificada.',
    unit_price: '45.00',
    duration_minutes: 20,
    created_at: new Date(),
    updated_at: new Date(),
  },
]

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    customer_name: 'María González',
    service_name: 'Depilación Láser',
    rating: 5,
    comment: 'Excelente resultado. El personal es muy profesional y la técnica es impecable.',
    created_at: new Date(),
  },
  {
    id: '2',
    customer_name: 'Carolina López',
    service_name: 'Masaje Relajante',
    rating: 5,
    comment: 'El mejor masaje que he tenido. Me sentí completamente relajada. Vuelvo seguro.',
    created_at: new Date(),
  },
  {
    id: '3',
    customer_name: 'Sofía Martínez',
    service_name: 'Facial Premium',
    rating: 4,
    comment: 'Muy buena atención. Mi piel quedó radiante después del tratamiento.',
    created_at: new Date(),
  },
  {
    id: '4',
    customer_name: 'Valentina Rodríguez',
    service_name: 'Manicura y Pedicura',
    rating: 5,
    comment: 'Las uñas duraron mucho tiempo y los diseños fueron tal como los pedí.',
    created_at: new Date(),
  },
]

export const FEATURED_SERVICES = MOCK_SERVICES.slice(0, 3)

// FASE 3: Booking flow mock data
export const MOCK_PROVIDERS: ServiceProvider[] = [
  {
    id: 'prov1',
    name: 'María García',
    email: 'maria@piubella.com',
    phone: '+54 9 1234 56789',
    specialties: 'Depilación láser, Faciales, Masaje',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 'prov2',
    name: 'Gabriela Rodríguez',
    email: 'gabriela@piubella.com',
    phone: '+54 9 1234 56790',
    specialties: 'Masaje terapéutico, Tratamiento capilar',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 'prov3',
    name: 'Alejandra López',
    email: 'alejandra@piubella.com',
    phone: '+54 9 1234 56791',
    specialties: 'Manicura, Pedicura, Bronceado',
    created_at: new Date(),
    updated_at: new Date(),
  },
]

export const MOCK_TIME_SLOTS: TimeSlot[] = [
  { id: '1', time: '09:00', available: true, provider: 'prov1' },
  { id: '2', time: '09:30', available: true, provider: 'prov1' },
  { id: '3', time: '10:00', available: false, provider: 'prov1' },
  { id: '4', time: '10:30', available: true, provider: 'prov1' },
  { id: '5', time: '11:00', available: true, provider: 'prov1' },
  { id: '6', time: '11:30', available: true, provider: 'prov2' },
  { id: '7', time: '12:00', available: false, provider: 'prov2' },
  { id: '8', time: '12:30', available: true, provider: 'prov2' },
  { id: '9', time: '14:00', available: true, provider: 'prov2' },
  { id: '10', time: '14:30', available: true, provider: 'prov3' },
  { id: '11', time: '15:00', available: true, provider: 'prov3' },
  { id: '12', time: '15:30', available: true, provider: 'prov3' },
  { id: '13', time: '16:00', available: false, provider: 'prov3' },
  { id: '14', time: '16:30', available: true, provider: 'prov3' },
  { id: '15', time: '17:00', available: true, provider: 'prov3' },
]
