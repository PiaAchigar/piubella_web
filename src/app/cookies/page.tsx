import type { Metadata } from 'next'
import { LegalPageLayout } from '@/components/legal/legal-page-layout'

export const metadata: Metadata = {
  title: 'Política de Cookies | Piu Bella Estética Pilates',
  description: 'Qué cookies utiliza el sitio de Piu Bella Estética Pilates y cómo gestionarlas.',
  robots: 'index, follow',
}

export default function CookiesPage() {
  return (
    <LegalPageLayout title="Política de Cookies" updatedAt="31 de julio de 2026">
      <section>
        <h2>1. Qué son las cookies</h2>
        <p>
          Las cookies son pequeños archivos que un sitio web guarda en tu navegador para recordar
          información sobre tu visita, como preferencias o el estado de una sesión.
        </p>
      </section>

      <section>
        <h2>2. Qué cookies utiliza este sitio</h2>
        <p>Actualmente utilizamos:</p>
        <ul>
          <li>
            <strong>Cookies técnicas/funcionales:</strong> necesarias para el funcionamiento básico del
            sitio (por ejemplo, mantener el estado del formulario de reserva mientras navegás).
          </li>
          <li>
            <strong>Cookies de Google Maps:</strong> el mapa embebido en la página de Contacto puede
            establecer cookies propias de Google al cargarse.
          </li>
          <li>
            <strong>Cookies de Mercado Pago:</strong> si elegís pagar con Mercado Pago, esa plataforma
            puede establecer sus propias cookies durante el proceso de pago.
          </li>
        </ul>
        <p>
          Hoy no utilizamos cookies de analítica (por ejemplo, Google Analytics) ni de publicidad. Si
          en el futuro incorporamos herramientas de este tipo, vamos a actualizar esta política antes
          de activarlas.
        </p>
      </section>

      <section>
        <h2>3. Cómo gestionar las cookies</h2>
        <p>
          Podés permitir, bloquear o eliminar las cookies desde la configuración de tu navegador. Ten
          en cuenta que bloquear ciertas cookies (como las de Google Maps) puede impedir que algunas
          partes del sitio, como el mapa de ubicación, funcionen correctamente.
        </p>
      </section>

      <section>
        <h2>4. Cambios en esta política</h2>
        <p>
          Podemos actualizar esta Política de Cookies cuando cambien las herramientas que usa el sitio.
          La fecha de la última actualización figura al comienzo de esta página.
        </p>
      </section>

      <section>
        <h2>5. Contacto</h2>
        <p>
          Ante cualquier consulta sobre el uso de cookies, escribinos a{' '}
          <a href="mailto:info@piubellaesteticapilates.com.ar">
            info@piubellaesteticapilates.com.ar
          </a>
          .
        </p>
      </section>
    </LegalPageLayout>
  )
}
