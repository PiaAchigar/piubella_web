import type { Metadata } from 'next'
import { LegalPageLayout } from '@/components/legal/legal-page-layout'

export const metadata: Metadata = {
  title: 'Política de Privacidad | Piu Bella Estética Pilates',
  description:
    'Cómo Piu Bella Estética Pilates recopila, usa y protege tus datos personales.',
  robots: 'index, follow',
}

export default function PrivacidadPage() {
  return (
    <LegalPageLayout title="Política de Privacidad" updatedAt="31 de julio de 2026">
      <section>
        <h2>1. Responsable del tratamiento de datos</h2>
        <p>
          El responsable del tratamiento de los datos personales recabados a través del sitio{' '}
          <a href="https://www.piubellaesteticapilates.com.ar">www.piubellaesteticapilates.com.ar</a>{' '}
          es Piu Bella Estética Pilates, con domicilio en México 1122, Provincia de Buenos Aires,
          Argentina. Podés contactarnos por correo a{' '}
          <a href="mailto:info@piubellaesteticapilates.com.ar">
            info@piubellaesteticapilates.com.ar
          </a>{' '}
          o por WhatsApp al +54 9 11 3377 5014.
        </p>
      </section>

      <section>
        <h2>2. Qué datos recopilamos</h2>
        <p>Recopilamos los datos que nos proporcionás voluntariamente al:</p>
        <ul>
          <li>Reservar un turno online (nombre, teléfono, email).</li>
          <li>Escribirnos por WhatsApp, Instagram, Facebook o el formulario de contacto.</li>
          <li>Realizar una compra o pago (datos fiscales cuando corresponde emitir factura).</li>
        </ul>
        <p>
          No solicitamos datos sensibles (salud, ideología, religión, etc.) a través del sitio web.
          Cualquier información de salud relevante para un tratamiento estético se recaba
          presencialmente y de forma directa con nuestro equipo.
        </p>
      </section>

      <section>
        <h2>3. Para qué usamos tus datos</h2>
        <ul>
          <li>Gestionar tu turno o reserva y contactarte para confirmarlo.</li>
          <li>Responder tus consultas por los distintos canales (WhatsApp, redes, email).</li>
          <li>Emitir comprobantes o facturas cuando corresponde.</li>
          <li>Procesar pagos a través de Mercado Pago cuando elegís ese medio de pago.</li>
          <li>Enviarte comunicaciones sobre turnos, promociones o novedades, cuando lo autorizás.</li>
        </ul>
      </section>

      <section>
        <h2>4. Con quién compartimos tus datos</h2>
        <p>No vendemos ni cedemos tus datos a terceros con fines comerciales. Sí los compartimos con:</p>
        <ul>
          <li>
            <strong>Mercado Pago</strong>, como procesador de pagos, cuando elegís pagar por esa vía.
          </li>
          <li>
            <strong>Meta (WhatsApp, Instagram, Facebook)</strong>, como plataformas de mensajería, cuando
            nos escribís por esos canales.
          </li>
          <li>
            Proveedores de infraestructura técnica (hosting, base de datos) que almacenan la
            información en nuestro nombre, bajo confidencialidad.
          </li>
        </ul>
      </section>

      <section>
        <h2>5. Tus derechos</h2>
        <p>
          De acuerdo con la Ley N.º 25.326 de Protección de Datos Personales, tenés derecho a acceder,
          rectificar, actualizar o solicitar la supresión de tus datos personales. Para ejercer estos
          derechos, escribinos a{' '}
          <a href="mailto:info@piubellaesteticapilates.com.ar">
            info@piubellaesteticapilates.com.ar
          </a>
          .
        </p>
        <p>
          La Agencia de Acceso a la Información Pública, en su carácter de Órgano de Control de la Ley
          N.º 25.326, tiene la atribución de atender las denuncias y reclamos que se interpongan con
          relación al incumplimiento de las normas sobre protección de datos personales.
        </p>
      </section>

      <section>
        <h2>6. Conservación y seguridad de los datos</h2>
        <p>
          Conservamos tus datos mientras exista una relación comercial activa (turnos, compras) y por
          el plazo que exige la normativa fiscal aplicable. Tomamos medidas técnicas y organizativas
          razonables para proteger tu información contra accesos no autorizados.
        </p>
      </section>

      <section>
        <h2>7. Cookies</h2>
        <p>
          El sitio utiliza cookies técnicas y de terceros. Podés ver el detalle en nuestra{' '}
          <a href="/cookies">Política de Cookies</a>.
        </p>
      </section>

      <section>
        <h2>8. Menores de edad</h2>
        <p>
          El sitio no está dirigido a menores de 18 años. Si sos menor de edad, pedile a un
          padre/madre o responsable que gestione el turno o la consulta por vos.
        </p>
      </section>

      <section>
        <h2>9. Cambios en esta política</h2>
        <p>
          Podemos actualizar esta política para reflejar cambios legales o en nuestros servicios. La
          fecha de la última actualización figura al comienzo de esta página.
        </p>
      </section>

      <section>
        <h2>10. Contacto</h2>
        <p>
          Ante cualquier duda sobre esta política, escribinos a{' '}
          <a href="mailto:info@piubellaesteticapilates.com.ar">
            info@piubellaesteticapilates.com.ar
          </a>{' '}
          o por WhatsApp al{' '}
          <a href="https://wa.me/5491133775014">+54 9 11 3377 5014</a>.
        </p>
      </section>
    </LegalPageLayout>
  )
}
