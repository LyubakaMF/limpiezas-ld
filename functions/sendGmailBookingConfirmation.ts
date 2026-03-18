import { createClientFromRequest } from 'npm:@base44/sdk@0.8.21';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { full_name, email, phone, service_type, preferred_date, preferred_time, address, notes } = await req.json();

    // Get Gmail access token
    const { accessToken } = await base44.asServiceRole.connectors.getConnection('gmail');
    
    // Create email content
    const subject = `Потврда резервације – ${full_name}`;
    const body = `
      <h2>Хвала на вашој резервацији!</h2>
      <p>Драги ${full_name},</p>
      <p>Примили смо вашу заявку за услугу чишћења. Ево детаља ваше резервације:</p>
      
      <h3>Детаљи резервације:</h3>
      <ul>
        <li><strong>Име:</strong> ${full_name}</li>
        <li><strong>Имејл:</strong> ${email}</li>
        <li><strong>Телефон:</strong> ${phone}</li>
        <li><strong>Врста услуге:</strong> ${service_type}</li>
        <li><strong>Преферирани датум:</strong> ${preferred_date}</li>
        <li><strong>Преферирано време:</strong> ${preferred_time}</li>
        <li><strong>Адреса:</strong> ${address}</li>
        ${notes ? `<li><strong>Напомене:</strong> ${notes}</li>` : ''}
      </ul>
      
      <p>Наш тим ће вас контактирати у року од 2 часа да потврди вашу резервацију.</p>
      
      <hr/>
      <p><strong>Потребна вам помоћ?</strong></p>
      <p>Позовите нас: <a href="tel:+34643533453">+34 643 53 34 53</a></p>
      <p>или се јавите преко WhatsApp: <a href="https://wa.me/34643533453">wa.me/34643533453</a></p>
      
      <p>Лимпиезас ЛД<br/>Професионални сервиси чишћења</p>
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