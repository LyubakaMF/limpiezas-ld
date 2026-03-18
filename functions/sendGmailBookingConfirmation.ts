import { createClientFromRequest } from 'npm:@base44/sdk@0.8.21';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { full_name, email, phone, service_type, preferred_date, preferred_time, address, notes } = await req.json();

    // Get Gmail access token
    const { accessToken } = await base44.asServiceRole.connectors.getConnection('gmail');
    
    // Create email content
    const subject = `Потвърждение на резервация – ${full_name}`;
    const body = `
      <h2>Благодарим за вашата резервация!</h2>
      <p>Уважаеми ${full_name},</p>
      <p>Получихме вашата заявка за услугата по почистване. Ето детайлите на вашата резервация:</p>
      
      <h3>Детайли на резервацията:</h3>
      <ul>
        <li><strong>Име:</strong> ${full_name}</li>
        <li><strong>Имейл:</strong> ${email}</li>
        <li><strong>Телефон:</strong> ${phone}</li>
        <li><strong>Вид услуга:</strong> ${service_type}</li>
        <li><strong>Предпочитана дата:</strong> ${preferred_date}</li>
        <li><strong>Предпочитано време:</strong> ${preferred_time}</li>
        <li><strong>Адрес:</strong> ${address}</li>
        ${notes ? `<li><strong>Забележки:</strong> ${notes}</li>` : ''}
      </ul>
      
      <p>Нашият екип ще се свърже с вас в рамките на 2 часа, за да потвърди вашата резервация.</p>
      
      <hr/>
      <p><strong>Нужна ви помощ?</strong></p>
      <p>Позвънете ни: <a href="tel:+34643533453">+34 643 53 34 53</a></p>
      <p>или отправете съобщение чрез WhatsApp: <a href="https://wa.me/34643533453">wa.me/34643533453</a></p>
      
      <p>Limpiezas LD<br/>Професионални услуги по почистване</p>
    `;

    // Encode email for Gmail API
    const message = [
      `To: ${email}`,
      'Subject: ' + subject,
      'Content-Type: text/html; charset="UTF-8"',
      'MIME-Version: 1.0',
      '',
      body
    ].join('\r\n');

    const encodedMessage = btoa(message).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

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