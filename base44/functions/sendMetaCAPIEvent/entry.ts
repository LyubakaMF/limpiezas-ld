import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';
import { createHash } from 'node:crypto';

const PIXEL_ID = '888360567553910';
const ACCESS_TOKEN = Deno.env.get('META_CAPI_ACCESS_TOKEN');

function hashData(value) {
  if (!value) return undefined;
  return createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

Deno.serve(async (req) => {
  if (!ACCESS_TOKEN) {
    return Response.json({ error: 'META_CAPI_ACCESS_TOKEN not set' }, { status: 500 });
  }

  const base44 = createClientFromRequest(req);

  const body = await req.json();
  const { email, phone, full_name, service_type, event_id } = body;

  // Hash PII data before sending to Meta
  const hashedEmail = hashData(email);
  const hashedPhone = hashData(phone ? phone.replace(/\s+/g, '') : null);

  const nameParts = (full_name || '').trim().split(' ');
  const hashedFirstName = hashData(nameParts[0] || null);
  const hashedLastName = hashData(nameParts.slice(1).join(' ') || null);

  const eventPayload = {
    data: [
      {
        event_name: 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        event_id: event_id || `booking_${Date.now()}`,
        action_source: 'website',
        user_data: {
          em: hashedEmail ? [hashedEmail] : undefined,
          ph: hashedPhone ? [hashedPhone] : undefined,
          fn: hashedFirstName ? [hashedFirstName] : undefined,
          ln: hashedLastName ? [hashedLastName] : undefined,
        },
        custom_data: {
          content_name: service_type || 'booking',
          content_category: 'cleaning_service',
        },
      },
    ],
  };

  const response = await fetch(
    `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventPayload),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    return Response.json({ error: result }, { status: 500 });
  }

  return Response.json({ success: true, result });
});