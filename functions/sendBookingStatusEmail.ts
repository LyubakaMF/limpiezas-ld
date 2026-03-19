Deno.serve(async (req) => {
  try {
    const apiKey = Deno.env.get('RESEND_API_KEY');
    if (!apiKey) {
      return Response.json({ success: false, error: 'RESEND_API_KEY is not configured' }, { status: 500 });
    }

    const { full_name, email, service_type, preferred_date, preferred_time, address, status, notes } = await req.json();

    const statusMessages = {
      confirmed: {
        subject: 'Tu reserva está confirmada - Limpiezas LD',
        message: '¡Tu reserva de servicio de limpieza ha sido <strong>confirmada</strong>! Nuestro equipo estará allí en el horario acordado.'
      },
      cancelled: {
        subject: 'Reserva cancelada - Limpiezas LD',
        message: 'Tu reserva de servicio de limpieza ha sido <strong>cancelada</strong>. Si tienes alguna pregunta, no dudes en contactarnos.'
      }
    };

    const statusInfo = statusMessages[status];
    if (!statusInfo) {
      return Response.json({ success: false, error: 'Status not supported for notification' }, { status: 400 });
    }

    const esc = (text) => {
      if (!text) return '';
      return text.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
    };

    const serviceTypeFormatted = service_type ? service_type.replace(/_/g, ' ').charAt(0).toUpperCase() + service_type.replace(/_/g, ' ').slice(1) : 'N/A';
    const timeFormatted = preferred_time ? preferred_time.charAt(0).toUpperCase() + preferred_time.slice(1) : 'N/A';

    const emailBody = `
      <h2>${statusInfo.message}</h2>
      <p>Hola ${esc(full_name)},</p>
      <h3>Detalles de tu reserva:</h3>
      <ul>
        <li><strong>Tipo de servicio:</strong> ${serviceTypeFormatted}</li>
        <li><strong>Fecha:</strong> ${esc(preferred_date)}</li>
        <li><strong>Hora:</strong> ${timeFormatted}</li>
        <li><strong>Dirección:</strong> ${esc(address)}</li>
        ${notes ? `<li><strong>Notas:</strong> ${esc(notes)}</li>` : ''}
      </ul>
      <hr/>
      <p><strong>¿Necesitas ayuda?</strong></p>
      <p>Llámanos: <a href="tel:+34643533453">+34 643 53 34 53</a></p>
      <p>WhatsApp: <a href="https://wa.me/34643533453">+34 643 53 34 53</a></p>
      <p>Limpiezas LD - Servicios de limpieza profesional</p>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Limpiezas LD <noreply@limpiezas-ld.com>',
        to: email,
        subject: statusInfo.subject,
        html: emailBody,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Resend error: ${err}`);
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error sending status email:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
});