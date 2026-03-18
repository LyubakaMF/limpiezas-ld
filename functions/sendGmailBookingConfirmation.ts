import { Resend } from 'npm:resend@2.1.0';

Deno.serve(async (req) => {
  try {
    const apiKey = Deno.env.get('RESEND_API_KEY');
    if (!apiKey) {
      return Response.json({ success: false, error: 'RESEND_API_KEY is not configured' }, { status: 500 });
    }

    const { full_name, email, phone, service_type, preferred_date, preferred_time, address, notes } = await req.json();
    const resend = new Resend(apiKey);

    // Send to admin
    await resend.emails.send({
      from: 'Limpiezas LD <noreply@resend.dev>',
      to: 'limpiezasdomesticos@gmail.com',
      subject: `New Booking Request - ${escapeHtml(full_name)}`,
      html: `
        <h2>New Booking Request</h2>
        <p><strong>Name:</strong> ${escapeHtml(full_name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Service Type:</strong> ${escapeHtml(service_type)}</p>
        <p><strong>Preferred Date:</strong> ${escapeHtml(preferred_date)}</p>
        <p><strong>Preferred Time:</strong> ${escapeHtml(preferred_time)}</p>
        <p><strong>Address:</strong> ${escapeHtml(address)}</p>
        ${notes ? `<p><strong>Notes:</strong> ${escapeHtml(notes)}</p>` : ''}
        <hr/>
        <p>Please contact the client within 2 hours to confirm their reservation.</p>
      `
    });

    // Send confirmation to client
    await resend.emails.send({
      from: 'Limpiezas LD <noreply@resend.dev>',
      to: email,
      subject: 'Booking Confirmation - Limpiezas LD',
      html: `
        <h2>Thank you for your reservation!</h2>
        <p>Dear ${escapeHtml(full_name)},</p>
        <p>We received your cleaning service request. Our team will contact you within 2 hours to confirm your reservation.</p>
        <h3>Reservation Details:</h3>
        <ul>
          <li><strong>Service Type:</strong> ${escapeHtml(service_type)}</li>
          <li><strong>Preferred Date:</strong> ${escapeHtml(preferred_date)}</li>
          <li><strong>Preferred Time:</strong> ${escapeHtml(preferred_time)}</li>
          <li><strong>Address:</strong> ${escapeHtml(address)}</li>
          ${notes ? `<li><strong>Notes:</strong> ${escapeHtml(notes)}</li>` : ''}
        </ul>
        <hr/>
        <p><strong>Need help?</strong></p>
        <p>Call us: <a href="tel:+34643533453">+34 643 53 34 53</a></p>
        <p>or message us on WhatsApp: <a href="https://wa.me/34643533453">wa.me/34643533453</a></p>
        <p>Limpiezas LD - Professional Cleaning Services</p>
      `
    });

    return Response.json({ success: true, message: 'Booking received. We will contact you soon.' });
  } catch (error) {
    console.error('Error sending emails:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
});

function escapeHtml(text) {
  if (!text) return '';
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return text.replace(/[&<>"']/g, m => map[m]);
}