import { createClientFromRequest } from 'npm:@base44/sdk@0.8.21';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { full_name, email, phone, service_type, preferred_date, preferred_time, address, notes } = await req.json();

    // Send to admin
    await base44.integrations.Core.SendEmail({
      to: 'limpiezasdomesticos@gmail.com',
      subject: `New Booking Request - ${full_name}`,
      body: `
        <h2>New Booking Request</h2>
        <p><strong>Name:</strong> ${full_name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service Type:</strong> ${service_type}</p>
        <p><strong>Preferred Date:</strong> ${preferred_date}</p>
        <p><strong>Preferred Time:</strong> ${preferred_time}</p>
        <p><strong>Address:</strong> ${address}</p>
        ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ''}
        <hr/>
        <p>Please contact the client within 2 hours to confirm their reservation.</p>
      `
    });

    // Send confirmation to client
    await base44.integrations.Core.SendEmail({
      to: email,
      subject: `Booking Confirmation - ${full_name}`,
      body: `
        <h2>Thank you for your reservation!</h2>
        <p>Dear ${full_name},</p>
        <p>We received your cleaning service request. Here are the details of your reservation:</p>
        
        <h3>Reservation Details:</h3>
        <ul>
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
      `
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error sending booking emails:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
});