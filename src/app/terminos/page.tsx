import type { Metadata } from 'next'
import { LegalPageLayout } from '@/components/legal/legal-page-layout'

export const metadata: Metadata = {
  title: 'Términos y Condiciones | Piu Bella Estética Pilates',
  description: 'Condiciones de uso del sitio y de las reservas online de Piu Bella Estética Pilates.',
  robots: 'index, follow',
}

export default function TerminosPage() {
  return (
    <LegalPageLayout title="Términos y Condiciones" updatedAt="31 de julio de 2026">
      <section>
        <h2>1. Objeto y aceptación</h2>
        <p>
          Estos Términos y Condiciones regulan el uso del sitio{' '}
          <a href="https://www.piubellaesteticapilates.com.ar">www.piubellaesteticapilates.com.ar</a>{' '}
          y la reserva online de turnos, operado por Piu Bella Estética Pilates, con domicilio en
          México 1122, Provincia de Buenos Aires, Argentina. Al usar el sitio o reservar un turno,
          aceptás estas condiciones.
        </p>
      </section>

      <section>
        <h2>2. Servicios ofrecidos</h2>
        <p>
          A través del sitio podés informarte sobre nuestros servicios de estética y Pilates, y
          reservar turnos de forma online. La disponibilidad mostrada refleja los horarios cargados
          por el local y puede cambiar sin previo aviso.
        </p>
      </section>

      <section>
        <h2>3. Reservas de turnos</h2>
        <p>
          Al reservar un turno online, tu solicitud queda en estado de <em>pre-reserva</em> mientras
          nuestro equipo la confirma. Si la reserva no se confirma dentro del plazo indicado en el
          proceso de reserva, el horario vuelve a estar disponible automáticamente.
        </p>
        <p>
          Podés cancelar o reprogramar tu turno sin cargo hasta 12 horas antes del horario
          reservado. Si la cancelación o el no-show se produce dentro de esas 12 horas, la seña
          abonada para reservar el turno no es reembolsable.
        </p>
      </section>

      <section>
        <h2>4. Pagos</h2>
        <p>
          Aceptamos pago en efectivo, transferencia bancaria y Mercado Pago. Cuando el pago se procesa
          por Mercado Pago, tu operación queda sujeta también a los términos y condiciones de esa
          plataforma. Los precios de nuestros servicios pueden actualizarse sin previo aviso; el
          precio válido para una compra ya realizada es el vigente al momento de esa operación.
        </p>
      </section>

      <section>
        <h2>5. Uso del sitio</h2>
        <p>
          Te comprometés a usar el sitio de buena fe y a proporcionar información veraz al reservar un
          turno o contactarnos. Nos reservamos el derecho de cancelar reservas realizadas con datos
          falsos o de mala fe.
        </p>
      </section>

      <section>
        <h2>6. Propiedad intelectual</h2>
        <p>
          Los textos, imágenes, logo y diseño del sitio son propiedad de Piu Bella Estética Pilates o
          se utilizan con la debida autorización. No está permitida su reproducción total o parcial
          sin autorización previa.
        </p>
      </section>

      <section>
        <h2>7. Limitación de responsabilidad</h2>
        <p>
          Hacemos nuestro mejor esfuerzo para que la información del sitio (horarios, precios,
          disponibilidad) esté actualizada, pero no garantizamos la ausencia total de errores.
          Cualquier diferencia se resuelve directamente con el local antes de confirmar el turno.
        </p>
      </section>

      <section>
        <h2>8. Modificaciones</h2>
        <p>
          Podemos modificar estos Términos y Condiciones en cualquier momento. Los cambios rigen desde
          su publicación en esta página, indicada en la fecha de última actualización.
        </p>
      </section>

      <section>
        <h2>9. Ley aplicable y jurisdicción</h2>
        <p>
          Estos Términos y Condiciones se rigen por las leyes de la República Argentina. Ante
          cualquier controversia, las partes se someten a los tribunales ordinarios de la
          Provincia de Buenos Aires.
        </p>
      </section>

      <section>
        <h2>10. Contacto</h2>
        <p>
          Para consultas sobre estos términos, escribinos a{' '}
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
