import { Resend } from 'npm:resend@2.1.0';

Deno.serve(async (req) => {
  try {
    const apiKey = Deno.env.get('RESEND_API_KEY');
    if (!apiKey) {
      return Response.json({ success: false, error: 'RESEND_API_KEY is not configured' }, { status: 500 });
    }

    const { full_name, email, service_type, preferred_date, preferred_time, address, status, notes } = await req.json();
    const resend = new Resend(apiKey);

    const statusMessages = {
      confirmed: {
        subject: 'Your Booking is Confirmed - Limpiezas LD',
        message: 'Your cleaning service booking has been <strong>confirmed</strong>! Our team will be there at the scheduled time.'
      },
      completed: {
        subject: 'Booking Completed - Limpiezas LD',
        message: 'Thank you for choosing Limpiezas LD! Your cleaning service has been <strong>completed</strong>.'
      },
      cancelled: {
        subject: 'Booking Cancelled - Limpiezas LD',
        message: 'Your cleaning service booking has been <strong>cancelled</strong>. If you have any questions, please contact us.'
      }
    };

    const statusInfo = statusMessages[status] || statusMessages.confirmed;

    const serviceTypeFormatted = service_type ? service_type.replace(/_/g, ' ').charAt(0).toUpperCase() + service_type.replace(/_/g, ' ').slice(1) : 'N/A';
    const timeFormatted = preferred_time ? preferred_time.charAt(0).toUpperCase() + preferred_time.slice(1) : 'N/A';

    const emailBody = `
      <h2>${statusInfo.message}</h2>
      <p>Dear ${escapeHtml(full_name)},</p>
      <h3>Your Booking Details:</h3>
      <ul>
        <li><strong>Service Type:</strong> ${serviceTypeFormatted}</li>
        <li><strong>Scheduled Date:</strong> ${escapeHtml(preferred_date)}</li>
        <li><strong>Scheduled Time:</strong> ${timeFormatted}</li>
        <li><strong>Address:</strong> ${escapeHtml(address)}</li>
        <li><strong>Status:</strong> <strong>${status.charAt(0).toUpperCase() + status.slice(1)}</strong></li>
        ${notes ? `<li><strong>Special Notes:</strong> ${escapeHtml(notes)}</li>` : ''}
      </ul>
      <hr/>
      <p><strong>Need help?</strong></p>
      <p>Call us: <a href="tel:+34643533453">+34 643 53 34 53</a></p>
      <p>or message us on WhatsApp: <a href="https://wa.me/34643533453">wa.me/34643533453</a></p>
      <p>Limpiezas LD - Professional Cleaning Services</p>
    `;

    const rawMessage = `From: Limpiezas LD <limpiezasdomesticos@gmail.com>\r\nTo: ${email}\r\nSubject: ${statusInfo.subject}\r\nMIME-Version: 1.0\r\nContent-Type: text/html; charset=UTF-8\r\n\r\n${emailBody}`;

    const response = await fetch('https://www.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        raw: encodeBase64(rawMessage)
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Gmail API error:', error);
      return Response.json({ success: false, error: error.error?.message || 'Failed to send email' }, { status: 500 });
    }

    return Response.json({ success: true, message: 'Status notification sent to client.' });
  } catch (error) {
    console.error('Error sending status email:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
});

function escapeHtml(text) {
  if (!text) return '';
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return text.replace(/[&<>"']/g, m => map[m]);
}