import { pgTable, uuid, varchar, serial, timestamp, text, boolean, decimal, check } from 'drizzle-orm/pg-core'
import { relations, sql } from 'drizzle-orm'

// SERVICES & TRAINING Schema
export const services = pgTable(
  'services',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 100 }).notNull(),
    description: text('description'),
    unit_price: decimal('unit_price', { precision: 10, scale: 2 }).notNull(),
    duration_minutes: serial('duration_minutes').notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
  },
  (table) => ({
    priceCheck: check('services_unit_price_positive', sql`${table.unit_price} >= 0`),
  }),
)

export const serviceProviders = pgTable('service_providers', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 100 }).notNull().unique(),
  phone: varchar('phone', { length: 20 }),
  specialties: text('specialties'), // JSON array as text
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
})

export const providerAvailability = pgTable('provider_availability', {
  id: uuid('id').primaryKey().defaultRandom(),
  provider_id: uuid('provider_id')
    .notNull()
    .references(() => serviceProviders.id),
  day_of_week: serial('day_of_week').notNull(), // 0-6 (Sunday-Saturday)
  start_time: varchar('start_time', { length: 5 }).notNull(), // HH:MM
  end_time: varchar('end_time', { length: 5 }).notNull(), // HH:MM
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
})

// OPERATIONS Schema
export const appointments = pgTable(
  'appointments',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    service_id: uuid('service_id').notNull().references(() => services.id),
    provider_id: uuid('provider_id')
      .notNull()
      .references(() => serviceProviders.id),
    customer_name: varchar('customer_name', { length: 100 }).notNull(),
    customer_email: varchar('customer_email', { length: 100 }).notNull(),
    customer_phone: varchar('customer_phone', { length: 20 }).notNull(),
    appointment_date: varchar('appointment_date', { length: 10 }).notNull(), // YYYY-MM-DD
    appointment_time: varchar('appointment_time', { length: 5 }).notNull(), // HH:MM
    status: varchar('status', { length: 20 }).notNull().default('pending'), // pending, confirmed, completed, cancelled
    notes: text('notes'),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
  },
  (table) => ({
    statusCheck: check(
      'appointments_status_valid',
      sql`${table.status} IN ('pending', 'confirmed', 'completed', 'cancelled')`,
    ),
  }),
)

// WEB Schema
export const companyConfig = pgTable('company_config', {
  id: uuid('id').primaryKey().defaultRandom(),
  company_name: varchar('company_name', { length: 100 }).notNull(),
  company_email: varchar('company_email', { length: 100 }).notNull(),
  company_phone: varchar('company_phone', { length: 20 }).notNull(),
  company_address: text('company_address'),
  website_url: varchar('website_url', { length: 255 }),
  social_media: text('social_media'), // JSON
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
})

export const openHours = pgTable('open_hours', {
  id: uuid('id').primaryKey().defaultRandom(),
  day_of_week: serial('day_of_week').notNull(), // 0-6 (Sunday-Saturday)
  open_time: varchar('open_time', { length: 5 }).notNull(), // HH:MM
  close_time: varchar('close_time', { length: 5 }).notNull(), // HH:MM
  is_closed: boolean('is_closed').default(false),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
})

// Relations
export const servicesRelations = relations(services, ({ many }) => ({
  appointments: many(appointments),
}))

export const serviceProvidersRelations = relations(
  serviceProviders,
  ({ many }) => ({
    availability: many(providerAvailability),
    appointments: many(appointments),
  }),
)

export const providerAvailabilityRelations = relations(
  providerAvailability,
  ({ one }) => ({
    provider: one(serviceProviders, {
      fields: [providerAvailability.provider_id],
      references: [serviceProviders.id],
    }),
  }),
)

export const appointmentsRelations = relations(appointments, ({ one }) => ({
  service: one(services, {
    fields: [appointments.service_id],
    references: [services.id],
  }),
  provider: one(serviceProviders, {
    fields: [appointments.provider_id],
    references: [serviceProviders.id],
  }),
}))
