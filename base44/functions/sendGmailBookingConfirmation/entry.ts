Deno.serve(async (req) => {
  try {
    const apiKey = Deno.env.get('RESEND_API_KEY');
    if (!apiKey) {
      return Response.json({ success: false, error: 'RESEND_API_KEY is not configured' }, { status: 500 });
    }

    const { full_name, email, phone, service_type, preferred_date, preferred_time, address, notes, lang = 'es' } = await req.json();

    const esc = (text) => {
      if (!text) return '';
      return text.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
    };

    const i18n = {
      es: {
        subject: `Nueva solicitud de reserva - ${full_name}`,
        adminTitle: 'Nueva solicitud de reserva',
        adminNote: 'Por favor, contacta al cliente en menos de 2 horas para confirmar la reserva.',
        clientSubject: 'Reserva recibida - Limpiezas LD',
        clientGreeting: `¡Gracias por tu reserva!`,
        clientHello: `Hola ${esc(full_name)},`,
        clientBody: 'Hemos recibido tu solicitud de servicio de limpieza. Nuestro equipo se pondrá en contacto contigo en menos de 2 horas para confirmar tu reserva.',
        detailsTitle: 'Detalles de tu reserva:',
        labels: { service: 'Tipo de servicio', date: 'Fecha preferida', time: 'Hora preferida', address: 'Dirección', notes: 'Notas', name: 'Nombre', email: 'Email', phone: 'Teléfono' },
        help: '¿Necesitas ayuda?',
        call: 'Llámanos',
        whatsapp: 'WhatsApp',
        footer: 'Limpiezas LD - Servicios de limpieza profesional',
      },
      en: {
        subject: `New Booking Request - ${full_name}`,
        adminTitle: 'New Booking Request',
        adminNote: 'Please contact the client within 2 hours to confirm the reservation.',
        clientSubject: 'Booking Received - Limpiezas LD',
        clientGreeting: 'Thank you for your booking!',
        clientHello: `Dear ${esc(full_name)},`,
        clientBody: 'We have received your cleaning service request. Our team will contact you within 2 hours to confirm your reservation.',
        detailsTitle: 'Your booking details:',
        labels: { service: 'Service Type', date: 'Preferred Date', time: 'Preferred Time', address: 'Address', notes: 'Notes', name: 'Name', email: 'Email', phone: 'Phone' },
        help: 'Need help?',
        call: 'Call us',
        whatsapp: 'WhatsApp',
        footer: 'Limpiezas LD - Professional Cleaning Services',
      },
      de: {
        subject: `Neue Buchungsanfrage - ${full_name}`,
        adminTitle: 'Neue Buchungsanfrage',
        adminNote: 'Bitte kontaktieren Sie den Kunden innerhalb von 2 Stunden, um die Buchung zu bestätigen.',
        clientSubject: 'Buchung erhalten - Limpiezas LD',
        clientGreeting: 'Vielen Dank für Ihre Buchung!',
        clientHello: `Hallo ${esc(full_name)},`,
        clientBody: 'Wir haben Ihre Anfrage erhalten. Unser Team wird Sie innerhalb von 2 Stunden kontaktieren, um Ihre Buchung zu bestätigen.',
        detailsTitle: 'Ihre Buchungsdetails:',
        labels: { service: 'Leistungsart', date: 'Bevorzugtes Datum', time: 'Bevorzugte Uhrzeit', address: 'Adresse', notes: 'Notizen', name: 'Name', email: 'E-Mail', phone: 'Telefon' },
        help: 'Brauchen Sie Hilfe?',
        call: 'Rufen Sie uns an',
        whatsapp: 'WhatsApp',
        footer: 'Limpiezas LD - Professionelle Reinigungsdienste',
      },
      fr: {
        subject: `Nouvelle demande de réservation - ${full_name}`,
        adminTitle: 'Nouvelle demande de réservation',
        adminNote: 'Veuillez contacter le client dans les 2 heures pour confirmer la réservation.',
        clientSubject: 'Réservation reçue - Limpiezas LD',
        clientGreeting: 'Merci pour votre réservation !',
        clientHello: `Bonjour ${esc(full_name)},`,
        clientBody: 'Nous avons reçu votre demande de service de nettoyage. Notre équipe vous contactera dans les 2 heures pour confirmer votre réservation.',
        detailsTitle: 'Détails de votre réservation :',
        labels: { service: 'Type de service', date: 'Date souhaitée', time: 'Heure souhaitée', address: 'Adresse', notes: 'Notes', name: 'Nom', email: 'E-mail', phone: 'Téléphone' },
        help: 'Besoin d\'aide ?',
        call: 'Appelez-nous',
        whatsapp: 'WhatsApp',
        footer: 'Limpiezas LD - Services de nettoyage professionnels',
      },
      it: {
        subject: `Nuova richiesta di prenotazione - ${full_name}`,
        adminTitle: 'Nuova richiesta di prenotazione',
        adminNote: 'Contatta il cliente entro 2 ore per confermare la prenotazione.',
        clientSubject: 'Prenotazione ricevuta - Limpiezas LD',
        clientGreeting: 'Grazie per la tua prenotazione!',
        clientHello: `Caro/a ${esc(full_name)},`,
        clientBody: 'Abbiamo ricevuto la tua richiesta di servizio di pulizia. Il nostro team ti contatterà entro 2 ore per confermare la tua prenotazione.',
        detailsTitle: 'Dettagli della tua prenotazione:',
        labels: { service: 'Tipo di servizio', date: 'Data preferita', time: 'Ora preferita', address: 'Indirizzo', notes: 'Note', name: 'Nome', email: 'Email', phone: 'Telefono' },
        help: 'Hai bisogno di aiuto?',
        call: 'Chiamaci',
        whatsapp: 'WhatsApp',
        footer: 'Limpiezas LD - Servizi di pulizia professionale',
      },
      nl: {
        subject: `Nieuwe boekingsaanvraag - ${full_name}`,
        adminTitle: 'Nieuwe boekingsaanvraag',
        adminNote: 'Neem binnen 2 uur contact op met de klant om de boeking te bevestigen.',
        clientSubject: 'Boeking ontvangen - Limpiezas LD',
        clientGreeting: 'Bedankt voor uw boeking!',
        clientHello: `Beste ${esc(full_name)},`,
        clientBody: 'We hebben uw aanvraag voor schoonmaakdiensten ontvangen. Ons team neemt binnen 2 uur contact met u op om uw boeking te bevestigen.',
        detailsTitle: 'Uw boekingsgegevens:',
        labels: { service: 'Servicetype', date: 'Voorkeursdatum', time: 'Voorkeurstijd', address: 'Adres', notes: 'Notities', name: 'Naam', email: 'E-mail', phone: 'Telefoon' },
        help: 'Hulp nodig?',
        call: 'Bel ons',
        whatsapp: 'WhatsApp',
        footer: 'Limpiezas LD - Professionele schoonmaakdiensten',
      },
    };

    const t = i18n[lang] || i18n.es;

    // Email to admin (always in Spanish)
    const adminT = i18n.es;
    await sendEmail(apiKey, 'limpiezasdomesticos@gmail.com', adminT.subject, `
      <h2>${adminT.adminTitle}</h2>
      <p><strong>${adminT.labels.name}:</strong> ${esc(full_name)}</p>
      <p><strong>${adminT.labels.email}:</strong> ${esc(email)}</p>
      <p><strong>${adminT.labels.phone}:</strong> ${esc(phone)}</p>
      <p><strong>${adminT.labels.service}:</strong> ${esc(service_type)}</p>
      <p><strong>${adminT.labels.date}:</strong> ${esc(preferred_date)}</p>
      <p><strong>${adminT.labels.time}:</strong> ${esc(preferred_time)}</p>
      <p><strong>${adminT.labels.address}:</strong> ${esc(address)}</p>
      ${notes ? `<p><strong>${adminT.labels.notes}:</strong> ${esc(notes)}</p>` : ''}
      <hr/>
      <p>${adminT.adminNote}</p>
    `);

    // Confirmation email to client in their language
    await sendEmail(apiKey, email, t.clientSubject, `
      <h2>${t.clientGreeting}</h2>
      <p>${t.clientHello}</p>
      <p>${t.clientBody}</p>
      <h3>${t.detailsTitle}</h3>
      <ul>
        <li><strong>${t.labels.service}:</strong> ${esc(service_type)}</li>
        <li><strong>${t.labels.date}:</strong> ${esc(preferred_date)}</li>
        <li><strong>${t.labels.time}:</strong> ${esc(preferred_time)}</li>
        <li><strong>${t.labels.address}:</strong> ${esc(address)}</li>
        ${notes ? `<li><strong>${t.labels.notes}:</strong> ${esc(notes)}</li>` : ''}
      </ul>
      <hr/>
      <p><strong>${t.help}</strong></p>
      <p>${t.call}: <a href="tel:+34643533453">+34 643 53 34 53</a></p>
      <p>${t.whatsapp}: <a href="https://wa.me/34643533453">+34 643 53 34 53</a></p>
      <p>${t.footer}</p>
    `);

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error sending emails:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
});

async function sendEmail(apiKey, to, subject, html) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: 'Limpiezas LD <noreply@limpiezas-ld.com>', to, subject, html }),
  });
  if (!res.ok) throw new Error(`Resend error: ${await res.text()}`);
  return res.json();
}