Deno.serve(async (req) => {
  try {
    const apiKey = Deno.env.get('RESEND_API_KEY');
    if (!apiKey) {
      return Response.json({ success: false, error: 'RESEND_API_KEY is not configured' }, { status: 500 });
    }

    const { full_name, email, service_type, preferred_date, preferred_time, address, status, notes, lang = 'es' } = await req.json();

    const esc = (text) => {
      if (!text) return '';
      return text.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
    };

    const i18n = {
      es: {
        confirmed: { subject: 'Tu reserva está confirmada - Limpiezas LD', message: '¡Tu reserva ha sido <strong>confirmada</strong>! Nuestro equipo estará allí en el horario acordado.' },
        cancelled: { subject: 'Reserva cancelada - Limpiezas LD', message: 'Tu reserva ha sido <strong>cancelada</strong>. Actualmente ofrecemos nuestros servicios en <strong>Águilas, Región de Murcia</strong> y sus alrededores. Si tu ubicación está fuera de esta zona o tienes alguna pregunta, no dudes en contactarnos.' },
        hello: (name) => `Hola ${name},`,
        detailsTitle: 'Detalles de tu reserva:',
        labels: { service: 'Tipo de servicio', date: 'Fecha', time: 'Hora', address: 'Dirección', notes: 'Notas' },
        help: '¿Necesitas ayuda?', call: 'Llámanos', footer: 'Limpiezas LD - Servicios de limpieza profesional',
      },
      en: {
        confirmed: { subject: 'Your Booking is Confirmed - Limpiezas LD', message: 'Your booking has been <strong>confirmed</strong>! Our team will be there at the scheduled time.' },
        cancelled: { subject: 'Booking Cancelled - Limpiezas LD', message: 'Your booking has been <strong>cancelled</strong>. We currently offer our services in <strong>Águilas, Región de Murcia</strong> and surrounding areas. If your location is outside this area or you have any questions, please don\'t hesitate to contact us.' },
        hello: (name) => `Dear ${name},`,
        detailsTitle: 'Your booking details:',
        labels: { service: 'Service Type', date: 'Date', time: 'Time', address: 'Address', notes: 'Notes' },
        help: 'Need help?', call: 'Call us', footer: 'Limpiezas LD - Professional Cleaning Services',
      },
      de: {
        confirmed: { subject: 'Ihre Buchung ist bestätigt - Limpiezas LD', message: 'Ihre Buchung wurde <strong>bestätigt</strong>! Unser Team wird zur vereinbarten Zeit bei Ihnen sein.' },
        cancelled: { subject: 'Buchung storniert - Limpiezas LD', message: 'Ihre Buchung wurde <strong>storniert</strong>. Wir bieten unsere Dienstleistungen derzeit in <strong>Águilas, Region Murcia</strong> und Umgebung an. Falls Ihr Standort außerhalb dieses Bereichs liegt oder Sie Fragen haben, kontaktieren Sie uns bitte.' },
        hello: (name) => `Hallo ${name},`,
        detailsTitle: 'Ihre Buchungsdetails:',
        labels: { service: 'Leistungsart', date: 'Datum', time: 'Uhrzeit', address: 'Adresse', notes: 'Notizen' },
        help: 'Brauchen Sie Hilfe?', call: 'Rufen Sie uns an', footer: 'Limpiezas LD - Professionelle Reinigungsdienste',
      },
      fr: {
        confirmed: { subject: 'Votre réservation est confirmée - Limpiezas LD', message: 'Votre réservation a été <strong>confirmée</strong> ! Notre équipe sera là à l\'heure convenue.' },
        cancelled: { subject: 'Réservation annulée - Limpiezas LD', message: 'Votre réservation a été <strong>annulée</strong>. Nous proposons actuellement nos services à <strong>Águilas, Région de Murcia</strong> et ses environs. Si votre localisation est en dehors de cette zone ou si vous avez des questions, n\'hésitez pas à nous contacter.' },
        hello: (name) => `Bonjour ${name},`,
        detailsTitle: 'Détails de votre réservation :',
        labels: { service: 'Type de service', date: 'Date', time: 'Heure', address: 'Adresse', notes: 'Notes' },
        help: 'Besoin d\'aide ?', call: 'Appelez-nous', footer: 'Limpiezas LD - Services de nettoyage professionnels',
      },
      it: {
        confirmed: { subject: 'La tua prenotazione è confermata - Limpiezas LD', message: 'La tua prenotazione è stata <strong>confermata</strong>! Il nostro team sarà lì all\'orario concordato.' },
        cancelled: { subject: 'Prenotazione annullata - Limpiezas LD', message: 'La tua prenotazione è stata <strong>annullata</strong>. Per qualsiasi domanda, contattaci.' },
        hello: (name) => `Caro/a ${name},`,
        detailsTitle: 'Dettagli della tua prenotazione:',
        labels: { service: 'Tipo di servizio', date: 'Data', time: 'Ora', address: 'Indirizzo', notes: 'Note' },
        help: 'Hai bisogno di aiuto?', call: 'Chiamaci', footer: 'Limpiezas LD - Servizi di pulizia professionale',
      },
      nl: {
        confirmed: { subject: 'Uw boeking is bevestigd - Limpiezas LD', message: 'Uw boeking is <strong>bevestigd</strong>! Ons team zal er zijn op het afgesproken tijdstip.' },
        cancelled: { subject: 'Boeking geannuleerd - Limpiezas LD', message: 'Uw boeking is <strong>geannuleerd</strong>. Als u vragen heeft, neem dan contact met ons op.' },
        hello: (name) => `Beste ${name},`,
        detailsTitle: 'Uw boekingsgegevens:',
        labels: { service: 'Servicetype', date: 'Datum', time: 'Tijd', address: 'Adres', notes: 'Notities' },
        help: 'Hulp nodig?', call: 'Bel ons', footer: 'Limpiezas LD - Professionele schoonmaakdiensten',
      },
    };

    const t = i18n[lang] || i18n.es;
    const statusInfo = t[status];

    if (!statusInfo) {
      return Response.json({ success: false, error: 'Status not supported for notification' }, { status: 400 });
    }

    const html = `
      <h2>${statusInfo.message}</h2>
      <p>${t.hello(esc(full_name))}</p>
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
      <p>WhatsApp: <a href="https://wa.me/34643533453">+34 643 53 34 53</a></p>
      <p>${t.footer}</p>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: 'Limpiezas LD <noreply@limpiezas-ld.com>', to: email, subject: statusInfo.subject, html }),
    });

    if (!res.ok) throw new Error(`Resend error: ${await res.text()}`);

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error sending status email:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
});