import type { Metadata } from 'next'
import '@/styles/globals.css'
import { Providers } from '@/providers/query-client-provider'
import { ErrorBoundary } from '@/components/shared/error-boundary'
import { Navigation } from '@/components/layout/navigation'
import { Footer } from '@/components/layout/footer'
import { WhatsAppFab } from '@/components/ui/whatsapp-fab'

export const metadata: Metadata = {
  title: 'Piu Bella Estética Pilates| Belleza y Cuidado Personal',
  description:
    'Cuidado integral para tu cuerpo, mente y alma.',
  keywords: ['belleza', 'spa', 'depilación', 'masajes', 'faciales'],
  robots: 'index, follow',
  icons: {
    icon: '/logo_marron.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body>
        <ErrorBoundary>
          <Providers>
            <div className="flex flex-col min-h-screen">
              <Navigation />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
            <WhatsAppFab />
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  )
}
