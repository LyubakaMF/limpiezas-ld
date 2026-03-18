import { createClientFromRequest } from 'npm:@base44/sdk@0.8.21';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { full_name, email, phone, service_type, preferred_date, preferred_time, address, notes } = await req.json();

    // Send to admin only (asServiceRole allows sending to external email)
    await base44.asServiceRole.integrations.Core.SendEmail({
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

    return Response.json({ success: true, message: 'Booking received. We will contact you soon.' });
  } catch (error) {
    console.error('Error sending booking notification:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
});