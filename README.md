# PiuBella Web

Página web y sistema de agenda de citas para PiuBella (empresa de servicios de belleza).

## Stack Tecnológico

- **Framework:** Next.js 14 (App Router)
- **Lenguaje:** TypeScript
- **Styling:** TailwindCSS + Custom tokens (Piubella Theme)
- **ORM:** Drizzle ORM
- **Backend:** Supabase (PostgreSQL)
- **Estado:** React Query (TanStack Query)
- **Testing:** Vitest + React Testing Library
- **Validación:** Zod

## Setup Inicial

### 1. Instalación de Dependencias

```bash
pnpm install
```

### 2. Configurar Variables de Entorno

Copiar `.env.local` y completar con credenciales de Supabase:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
DATABASE_URL=postgresql://user:password@localhost:5432/piubella
```

### 3. Inicializar Base de Datos (Drizzle)

```bash
# Push schema a Supabase
pnpm run db:push

# O generar migraciones
pnpm run db:migrate
```

## Comandos Principales

```bash
# Desarrollo
pnpm run dev                 # Servidor local en localhost:3000

# Build & Deploy
pnpm run build              # Build para producción
pnpm run start              # Servir build localmente

# Testing
pnpm run test               # Ejecutar tests
pnpm run test:watch         # Watch mode

# Base de Datos (Drizzle)
pnpm run db:migrate         # Ejecutar migraciones
pnpm run db:push            # Push schema a Supabase
pnpm run db:studio          # Abrir Drizzle Studio (GUI)

# Linting
pnpm run lint               # ESLint + TypeScript check
```

## Estructura de Carpetas

```
src/
├── app/              # Next.js App Router (páginas)
├── components/       # Componentes React
│   ├── ui/          # Componentes base (Button, Input, etc.)
│   ├── layout/      # Layout components (Nav, Footer)
│   ├── calendar/    # Componentes de agenda
│   └── shared/      # Componentes compartidos
├── lib/
│   ├── db/          # Drizzle schema y client
│   ├── supabase/    # Clientes de Supabase
│   └── utils.ts     # Utilidades
├── hooks/           # Custom React Hooks
├── types/           # Tipos TypeScript
├── styles/          # CSS global
└── __tests__/       # Tests
```

## Fases de Implementación

### FASE 0: Setup & Arquitectura Base ✅
- [x] Estructura de carpetas
- [x] Configuración Next.js, TailwindCSS, Drizzle
- [x] Variables de entorno
- [x] Schema inicial de Drizzle

### FASE 1: Componentes Base & Layout
- [ ] Componentes UI (Button, Input, Card, etc.)
- [ ] Navigation & Footer
- [ ] RootLayout con providers

### FASE 2: Home & Servicios
- [ ] Página Home
- [ ] Página Servicios
- [ ] Componentes ServiceCard, HeroSection

### FASE 3: Sistema de Agenda
- [ ] Página Agenda
- [ ] Calendar Picker
- [ ] Formulario de reserva
- [ ] Panel de confirmación

### FASE 4: Integración Supabase & Real-Time
- [ ] Queries con Drizzle
- [ ] Mutations con Drizzle
- [ ] Real-time subscriptions
- [ ] Validación con Zod

### FASE 5: Contacto & Validaciones
- [ ] Página Contacto
- [ ] Sistema de notificaciones
- [ ] Confirmaciones por email

### FASE 6: Tests E2E & QA
- [ ] Tests E2E (Playwright)
- [ ] Tests de accesibilidad
- [ ] Tests de performance

### FASE 7: Optimización & Deploy
- [ ] Optimización de imágenes
- [ ] ISR (Incremental Static Regeneration)
- [ ] CI/CD (GitHub Actions)
- [ ] Deploy a Vercel

## Documentación

- **[CLAUDE.md](./CLAUDE.md)** - Arquitectura y patrones de desarrollo
- **[design/DESIGN.md](./design/DESIGN.md)** - Sistema de diseño (colores, tipografía)
- **[planing/PLAN_FASES.md](./planing/PLAN_FASES.md)** - Plan detallado de implementación
- **[planing/GUIA_DESARROLLO.md](./planing/GUIA_DESARROLLO.md)** - Guía técnica de desarrollo

## Notas Importantes

- **Mobile First:** Diseñar y testear en mobile primero
- **Design Authority:** Todos los colores vienen de `design/DESIGN.md`
- **Type Safety:** TypeScript strict mode + Zod runtime validation
- **Testing:** TDD - escribir tests ANTES del código
- **Drizzle ORM:** Schema en `src/lib/db/schema.ts` es la fuente de verdad

## Support

Para preguntas o issues, contactar al equipo de desarrollo.
