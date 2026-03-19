Deno.serve(async (req) => {
  try {
    const { data } = await req.json();

    const apiKey = Deno.env.get('RESEND_API_KEY');
    if (!apiKey) {
      return Response.json({ success: false, error: 'RESEND_API_KEY is not configured' }, { status: 500 });
    }

    const sendEmail = async (to, subject, html) => {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Limpiezas LD <noreply@limpiezas-ld.com>',
          to,
          subject,
          html,
        }),
      });
      if (!res.ok) {
        const err = await res.text();
        throw new Error(`Resend error: ${err}`);
      }
      return res.json();
    };

    const esc = (text) => {
      if (!text) return '';
      return text.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
    };

    // Email to admin
    await sendEmail(
      'limpiezasdomesticos@gmail.com',
      `Nueva solicitud de reserva - ${esc(data.full_name)}`,
      `
        <h2>Nueva solicitud de reserva</h2>
        <p><strong>Nombre:</strong> ${esc(data.full_name)}</p>
        <p><strong>Email:</strong> ${esc(data.email)}</p>
        <p><strong>Teléfono:</strong> ${esc(data.phone)}</p>
        <p><strong>Tipo de servicio:</strong> ${esc(data.service_type)}</p>
        <p><strong>Fecha preferida:</strong> ${esc(data.preferred_date)}</p>
        <p><strong>Hora preferida:</strong> ${esc(data.preferred_time)}</p>
        <p><strong>Dirección:</strong> ${esc(data.address)}</p>
        ${data.notes ? `<p><strong>Notas:</strong> ${esc(data.notes)}</p>` : ''}
        <hr/>
        <p>Por favor, contacta al cliente dentro de 2 horas para confirmar la reserva.</p>
      `
    );

    // Confirmation email to client
    await sendEmail(
      data.email,
      'Reserva recibida - Limpiezas LD',
      `
        <h2>¡Gracias por tu reserva!</h2>
        <p>Hola ${esc(data.full_name)},</p>
        <p>Recibimos tu solicitud de servicio de limpieza. Nuestro equipo se pondrá en contacto contigo dentro de 2 horas para confirmar tu reserva.</p>
        <h3>Detalles de la reserva:</h3>
        <ul>
          <li><strong>Tipo de servicio:</strong> ${esc(data.service_type)}</li>
          <li><strong>Fecha preferida:</strong> ${esc(data.preferred_date)}</li>
          <li><strong>Hora preferida:</strong> ${esc(data.preferred_time)}</li>
          <li><strong>Dirección:</strong> ${esc(data.address)}</li>
          ${data.notes ? `<li><strong>Notas:</strong> ${esc(data.notes)}</li>` : ''}
        </ul>
        <hr/>
        <p><strong>¿Necesitas ayuda?</strong></p>
        <p>Llámanos: <a href="tel:+34643533453">+34 643 53 34 53</a></p>
        <p>WhatsApp: <a href="https://wa.me/34643533453">+34 643 53 34 53</a></p>
        <p>Limpiezas LD - Servicios de limpieza profesional</p>
      `
    );

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error sending booking email:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
});