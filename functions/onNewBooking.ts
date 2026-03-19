import { Resend } from 'npm:resend@2.1.0';
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.21';

Deno.serve(async (req) => {
  try {
    const { data } = await req.json();

    const apiKey = Deno.env.get('RESEND_API_KEY');
    if (!apiKey) {
      return Response.json({ success: false, error: 'RESEND_API_KEY is not configured' }, { status: 500 });
    }

    const resend = new Resend(apiKey);

    // Send to admin
    await resend.emails.send({
      from: 'Limpiezas LD <noreply@limpiezasld.com>',
      to: 'limpiezasdomesticos@gmail.com',
      subject: `Nueva solicitud de reserva - ${escapeHtml(data.full_name)}`,
      html: `
        <h2>Nueva solicitud de reserva</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(data.full_name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Teléfono:</strong> ${escapeHtml(data.phone)}</p>
        <p><strong>Tipo de servicio:</strong> ${escapeHtml(data.service_type)}</p>
        <p><strong>Fecha preferida:</strong> ${escapeHtml(data.preferred_date)}</p>
        <p><strong>Hora preferida:</strong> ${escapeHtml(data.preferred_time)}</p>
        <p><strong>Dirección:</strong> ${escapeHtml(data.address)}</p>
        ${data.notes ? `<p><strong>Notas:</strong> ${escapeHtml(data.notes)}</p>` : ''}
        <hr/>
        <p>Por favor, contacta al cliente dentro de 2 horas para confirmar la reserva.</p>
      `
    });

    // Send confirmation to client
    await resend.emails.send({
      from: 'Limpiezas LD <noreply@limpiezasld.com>',
      to: data.email,
      subject: 'Reserva confirmada - Limpiezas LD',
      html: `
        <h2>¡Gracias por tu reserva!</h2>
        <p>Hola ${escapeHtml(data.full_name)},</p>
        <p>Recibimos tu solicitud de servicio de limpieza. Nuestro equipo se pondrá en contacto contigo dentro de 2 horas para confirmar tu reserva.</p>
        <h3>Detalles de la reserva:</h3>
        <ul>
          <li><strong>Tipo de servicio:</strong> ${escapeHtml(data.service_type)}</li>
          <li><strong>Fecha preferida:</strong> ${escapeHtml(data.preferred_date)}</li>
          <li><strong>Hora preferida:</strong> ${escapeHtml(data.preferred_time)}</li>
          <li><strong>Dirección:</strong> ${escapeHtml(data.address)}</li>
          ${data.notes ? `<li><strong>Notas:</strong> ${escapeHtml(data.notes)}</li>` : ''}
        </ul>
        <hr/>
        <p><strong>¿Necesitas ayuda?</strong></p>
        <p>Llámanos: <a href="tel:+34643533453">+34 643 53 34 53</a></p>
        <p>o escríbenos por WhatsApp: <a href="https://wa.me/34643533453">wa.me/34643533453</a></p>
        <p>Limpiezas LD - Servicios de limpieza profesional</p>
      `
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error sending booking email:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
});

function escapeHtml(text) {
  if (!text) return '';
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return text.replace(/[&<>"']/g, m => map[m]);
}