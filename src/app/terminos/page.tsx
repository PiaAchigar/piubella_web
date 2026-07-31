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
          y la reserva online de turnos, operado por Laura Da Ruda (Piu Bella Estética Pilates),
          CUIT 2720515983, con domicilio en México 1120, El Talar, Provincia de Buenos Aires,
          Argentina. Al usar el sitio o reservar un turno, aceptás estas condiciones.
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
      </section>

      <section>
        <h2>4. Política de cancelación de turnos y paquetes</h2>

        <p>
          <strong>Reembolsos y vigencia</strong>
        </p>
        <ul>
          <li>Los tratamientos no tienen reembolso.</li>
          <li>
            Cada pack tiene una vigencia definida según la cantidad de sesiones y su frecuencia.
            Como referencia, un pack se realiza dentro de los 30 días desde su contratación (por
            ejemplo, un pack de 6 sesiones de Alpha tiene una vigencia de un mes y medio).
          </li>
        </ul>

        <p>
          <strong>Turnos</strong>
        </p>
        <ul>
          <li>
            Si llegás tarde, ese tiempo se descuenta de tu sesión: no queda pendiente para otro
            día. Si no asistís, la sesión se pierde.
          </li>
          <li>
            Para reprogramar un turno, avisanos con 24 hs hábiles de anticipación. Pasado ese
            plazo, el sistema no nos permite hacer el cambio.
          </li>
        </ul>

        <p>
          <strong>Señas y reservas</strong>
        </p>
        <ul>
          <li>
            Las reservas de turno no tienen reembolso, pero podés usarlas para otro servicio
            dentro de los 30 días hábiles desde que enviaste la seña, siempre que reprogrames
            dentro del plazo establecido.
          </li>
          <li>Si no asistís, la seña se pierde.</li>
          <li>Si pedís un cambio fuera de ese plazo, vas a tener que hacer una nueva seña.</li>
        </ul>
      </section>

      <section>
        <h2>5. Política de actividades</h2>

        <p>
          <strong>Inscripción</strong>
        </p>
        <ul>
          <li>
            Podés inscribirte en cualquier momento del año y del mes. Trabajamos con un arancel
            mensual, del 1° al 30/31.
          </li>
          <li>
            Al iniciar se abona la cuota completa. Como primera opción, te ofrecemos recuperar las
            clases ya transcurridas del mes. Si no llegás a recuperarlas, ese monto queda a favor
            tuyo para la cuota del mes siguiente. En caso de no continuar con la actividad, ese
            dinero no se reintegra.
          </li>
          <li>
            A partir del segundo mes, la cuota se abona del 1 al 10, descontando el saldo a favor.
            Pasado el día 10, el sistema aplica un 10% de recargo sobre el arancel.
          </li>
        </ul>

        <p>
          <strong>Suspensiones</strong>
        </p>
        <ul>
          <li>
            Para suspender una clase y poder recuperarla, avisanos con un mínimo de 2 hs de
            anticipación.
          </li>
          <li>
            La recuperación se realiza en cualquier horario disponible, dentro del mismo mes o
            durante la primera semana del mes siguiente (siempre que continúes con la actividad y
            reserves con anticipación).
          </li>
        </ul>

        <p>
          <strong>Baja</strong>
        </p>
        <ul>
          <li>
            La baja se solicita antes del 30 del mes en curso, para dejar de abonar el mes
            siguiente. Pasada esa fecha, se abona el proporcional correspondiente.
          </li>
        </ul>
      </section>

      <section>
        <h2>6. Pagos</h2>
        <p>
          Aceptamos pago en efectivo, transferencia bancaria y Mercado Pago. Cuando el pago se procesa
          por Mercado Pago, tu operación queda sujeta también a los términos y condiciones de esa
          plataforma. Los precios de nuestros servicios pueden actualizarse sin previo aviso; el
          precio válido para una compra ya realizada es el vigente al momento de esa operación.
        </p>
      </section>

      <section>
        <h2>7. Uso del sitio</h2>
        <p>
          Te comprometés a usar el sitio de buena fe y a proporcionar información veraz al reservar un
          turno o contactarnos. Nos reservamos el derecho de cancelar reservas realizadas con datos
          falsos o de mala fe.
        </p>
      </section>

      <section>
        <h2>8. Propiedad intelectual</h2>
        <p>
          Los textos, imágenes, logo y diseño del sitio son propiedad de Piu Bella Estética Pilates o
          se utilizan con la debida autorización. No está permitida su reproducción total o parcial
          sin autorización previa.
        </p>
      </section>

      <section>
        <h2>9. Limitación de responsabilidad</h2>
        <p>
          Hacemos nuestro mejor esfuerzo para que la información del sitio (horarios, precios,
          disponibilidad) esté actualizada, pero no garantizamos la ausencia total de errores.
          Cualquier diferencia se resuelve directamente con el local antes de confirmar el turno.
        </p>
      </section>

      <section>
        <h2>10. Modificaciones</h2>
        <p>
          Podemos modificar estos Términos y Condiciones en cualquier momento. Los cambios rigen desde
          su publicación en esta página, indicada en la fecha de última actualización.
        </p>
      </section>

      <section>
        <h2>11. Ley aplicable y jurisdicción</h2>
        <p>
          Estos Términos y Condiciones se rigen por las leyes de la República Argentina. Ante
          cualquier controversia, las partes se someten a los tribunales ordinarios de la
          Provincia de Buenos Aires.
        </p>
      </section>

      <section>
        <h2>12. Contacto</h2>
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
