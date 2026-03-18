import { createClientFromRequest } from 'npm:@base44/sdk@0.8.21';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { full_name, email, phone, service_type, preferred_date, preferred_time, address, notes } = await req.json();

    // Get Gmail access token
    const { accessToken } = await base44.asServiceRole.connectors.getConnection('gmail');
    
    // Create email content
    const subject = `Reservation Confirmation - ${full_name}`;
    const body = `
      <h2>Thank you for your reservation!</h2>
      <p>Dear ${full_name},</p>
      <p>We received your cleaning service request. Here are the details of your reservation:</p>
      
      <h3>Reservation Details:</h3>
      <ul>
        <li><strong>Name:</strong> ${full_name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>Service Type:</strong> ${service_type}</li>
        <li><strong>Preferred Date:</strong> ${preferred_date}</li>
        <li><strong>Preferred Time:</strong> ${preferred_time}</li>
        <li><strong>Address:</strong> ${address}</li>
        ${notes ? `<li><strong>Notes:</strong> ${notes}</li>` : ''}
      </ul>
      
      <p>Our team will contact you within 2 hours to confirm your reservation.</p>
      
      <hr/>
      <p><strong>Need help?</strong></p>
      <p>Call us: <a href="tel:+34643533453">+34 643 53 34 53</a></p>
      <p>or message us on WhatsApp: <a href="https://wa.me/34643533453">wa.me/34643533453</a></p>
      
      <p>Limpiezas LD<br/>Professional Cleaning Services</p>
    `;

    // Encode email for Gmail API with UTF-8 support
    const message = [
      `To: ${email}`,
      'Subject: ' + subject,
      'Content-Type: text/html; charset="UTF-8"',
      'MIME-Version: 1.0',
      '',
      body
    ].join('\r\n');

    // Properly encode UTF-8 for Gmail API
    const uint8Array = new TextEncoder().encode(message);
    const binaryString = Array.from(uint8Array).map(byte => String.fromCharCode(byte)).join('');
    const encodedMessage = btoa(binaryString).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

    // Send via Gmail API
    const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        raw: encodedMessage
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Gmail API error:', error);
      throw new Error(`Gmail API error: ${error.error.message}`);
    }

    const result = await response.json();
    return Response.json({ success: true, messageId: result.id });
  } catch (error) {
    console.error('Error sending booking confirmation:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
});