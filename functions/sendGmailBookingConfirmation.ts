import { createClientFromRequest } from 'npm:@base44/sdk@0.8.21';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { full_name, email, phone, service_type, preferred_date, preferred_time, address, notes } = await req.json();

    // Get Gmail access token via connector
    const { accessToken } = await base44.asServiceRole.connectors.getConnection('gmail');

    // Encode email content as base64 (RFC 2822 format required by Gmail API)
    const emailContent = `From: limpiezasdomesticos@gmail.com\r\nTo: limpiezasdomesticos@gmail.com\r\nSubject: =?UTF-8?B?${btoa('New Booking Request - ' + full_name)}?=\r\nContent-Type: text/html; charset="UTF-8"\r\nContent-Transfer-Encoding: base64\r\n\r\n${btoa(getEmailBody(full_name, email, phone, service_type, preferred_date, preferred_time, address, notes))}`;

    const encodedMessage = btoa(emailContent).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

    // Send via Gmail API
    const response = await fetch('https://www.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ raw: encodedMessage }),
    });

    if (!response.ok) {
      throw new Error(`Gmail API error: ${response.statusText}`);
    }

    return Response.json({ success: true, message: 'Booking received. We will contact you soon.' });
  } catch (error) {
    console.error('Error sending booking notification:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
});

function getEmailBody(full_name, email, phone, service_type, preferred_date, preferred_time, address, notes) {
  return `<h2>New Booking Request</h2>
    <p><strong>Name:</strong> ${escapeHtml(full_name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
    <p><strong>Service Type:</strong> ${escapeHtml(service_type)}</p>
    <p><strong>Preferred Date:</strong> ${escapeHtml(preferred_date)}</p>
    <p><strong>Preferred Time:</strong> ${escapeHtml(preferred_time)}</p>
    <p><strong>Address:</strong> ${escapeHtml(address)}</p>
    ${notes ? `<p><strong>Notes:</strong> ${escapeHtml(notes)}</p>` : ''}
    <hr/>
    <p>Please contact the client within 2 hours to confirm their reservation.</p>`;
}

function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return text.replace(/[&<>"']/g, m => map[m]);
}