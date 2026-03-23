import { createClientFromRequest } from 'npm:@base44/sdk@0.8.21';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { full_name, email, phone, service_type, preferred_date, preferred_time, address, notes } = await req.json();

    await base44.integrations.Core.SendEmail({
      to: 'limpiezasdomesticos@gmail.com',
      subject: `Nueva solicitud de limpieza – ${full_name}`,
      body: `
        <h2>Nueva solicitud de reserva</h2>
        <p><strong>Nombre:</strong> ${full_name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Servicio:</strong> ${service_type}</p>
        <p><strong>Fecha:</strong> ${preferred_date} – ${preferred_time}</p>
        <p><strong>Dirección:</strong> ${address}</p>
        <p><strong>Notas:</strong> ${notes || '–'}</p>
        <hr/>
        <p>📱 También puedes responder por WhatsApp: <a href="https://wa.me/34643533453">wa.me/34643533453</a></p>
      `
    });

    return Response.json({ success: true, message: 'Booking email sent successfully' });
  } catch (error) {
    console.error('Error sending booking email:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
});